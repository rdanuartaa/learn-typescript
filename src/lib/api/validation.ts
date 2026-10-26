const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const MAX_JSON_BYTES = 128 * 1024;
export const MAX_REORDER_ITEMS = 100;
export const MAX_UPLOAD_REQUEST_BYTES = 6 * 1024 * 1024;
export const MAX_CV_BYTES = 5 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export class RequestValidationError extends Error {
  constructor(
    message: string,
    public readonly status = 400
  ) {
    super(message);
    this.name = "RequestValidationError";
  }
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readRequestBytes(request: Request, maxBytes: number): Promise<Uint8Array> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const parsedLength = Number(declaredLength);
    if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) {
      throw new RequestValidationError("Invalid Content-Length header", 400);
    }
    if (parsedLength > maxBytes) {
      throw new RequestValidationError("Request body is too large", 413);
    }
  }

  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new RequestValidationError("Request body is too large", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export async function readJsonObject(
  request: Request,
  maxBytes = MAX_JSON_BYTES
): Promise<UnknownRecord> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim();
  if (contentType !== "application/json") {
    throw new RequestValidationError("Content-Type must be application/json", 415);
  }

  const bytes = await readRequestBytes(request, maxBytes);
  let value: unknown;
  try {
    value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new RequestValidationError("Request body must contain valid JSON");
  }

  if (!isRecord(value)) {
    throw new RequestValidationError("Request body must be a JSON object");
  }
  return value;
}

export async function readBoundedFormData(request: Request): Promise<FormData> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data;")) {
    throw new RequestValidationError("Content-Type must be multipart/form-data", 415);
  }

  const bytes = await readRequestBytes(request, MAX_UPLOAD_REQUEST_BYTES);
  const bodyBuffer = Uint8Array.from(bytes).buffer;
  const boundedRequest = new Request("http://localhost/upload", {
    method: "POST",
    headers: { "content-type": contentType },
    body: bodyBuffer,
  });
  try {
    return await boundedRequest.formData();
  } catch {
    throw new RequestValidationError("Malformed multipart body");
  }
}

function requiredString(
  value: unknown,
  field: string,
  maxLength: number
): string {
  if (typeof value !== "string") {
    throw new RequestValidationError(`${field} must be a string`);
  }
  const clean = value.trim();
  if (!clean || clean.length > maxLength) {
    throw new RequestValidationError(`${field} must contain 1-${maxLength} characters`);
  }
  return clean;
}

function optionalString(
  value: unknown,
  field: string,
  maxLength: number
): string | null {
  if (value === undefined || value === null || value === "") return null;
  return requiredString(value, field, maxLength);
}

function integer(value: unknown, field: string, min: number, max: number): number {
  if (!Number.isInteger(value) || (value as number) < min || (value as number) > max) {
    throw new RequestValidationError(`${field} must be an integer from ${min} to ${max}`);
  }
  return value as number;
}

export function parseUuid(value: unknown, field = "id"): string {
  if (typeof value !== "string" || !UUID_PATTERN.test(value)) {
    throw new RequestValidationError(`${field} must be a valid UUID`);
  }
  return value;
}

function safeUrl(
  value: unknown,
  field: string,
  options: { allowRelative?: boolean; allowAnchor?: boolean } = {}
): string | null {
  const clean = optionalString(value, field, 2048);
  if (clean === null) return null;

  if (options.allowAnchor && /^#[a-zA-Z][\w-]*$/.test(clean)) return clean;
  if (options.allowRelative && /^\/(?!\/)[^\s]*$/.test(clean)) return clean;

  try {
    const url = new URL(clean);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    // Fall through to the validation error.
  }
  throw new RequestValidationError(`${field} must be an HTTP(S) URL`);
}

export function parseProjectPayload(body: UnknownRecord) {
  return {
    title: requiredString(body.title, "title", 160),
    title_en: optionalString(body.title_en, "title_en", 160),
    description: requiredString(body.description, "description", 3000),
    description_en: optionalString(body.description_en, "description_en", 3000),
    image: safeUrl(body.image, "image", { allowRelative: true }),
    href: safeUrl(body.href, "href", { allowRelative: true, allowAnchor: true }),
    order_index: integer(body.order_index ?? 0, "order_index", 0, 9999),
  };
}

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.length > 20) {
    throw new RequestValidationError(`${field} must be an array with at most 20 items`);
  }
  return value.map((item, index) => requiredString(item, `${field}[${index}]`, 500));
}

export function parseExperiencePayload(body: UnknownRecord) {
  return {
    period: requiredString(body.period, "period", 100),
    period_en: optionalString(body.period_en, "period_en", 100),
    role: requiredString(body.role, "role", 200),
    role_en: optionalString(body.role_en, "role_en", 200),
    description: requiredString(body.description, "description", 3000),
    description_en: optionalString(body.description_en, "description_en", 3000),
    details: stringArray(body.details, "details"),
    details_en: body.details_en == null ? [] : stringArray(body.details_en, "details_en"),
    order_index: integer(body.order_index ?? 0, "order_index", 0, 9999),
  };
}

export function parseReorderPayload(body: UnknownRecord) {
  if (body.reorder !== true || !Array.isArray(body.items)) {
    throw new RequestValidationError("Invalid reorder request");
  }
  if (body.items.length === 0 || body.items.length > MAX_REORDER_ITEMS) {
    throw new RequestValidationError(`items must contain 1-${MAX_REORDER_ITEMS} entries`);
  }

  const rawItems = body.items;
  const maxOrderIndex = rawItems.length - 1;
  const ids = new Set<string>();
  const indexes = new Set<number>();
  const items = rawItems.map((raw, index) => {
    if (!isRecord(raw)) throw new RequestValidationError(`items[${index}] must be an object`);
    const id = parseUuid(raw.id, `items[${index}].id`);
    const orderIndex = integer(raw.order_index, `items[${index}].order_index`, 0, maxOrderIndex);
    if (ids.has(id) || indexes.has(orderIndex)) {
      throw new RequestValidationError("Reorder ids and order indexes must be unique");
    }
    ids.add(id);
    indexes.add(orderIndex);
    return { id, order_index: orderIndex };
  });

  return items;
}

export function parseCvPayload(body: UnknownRecord) {
  const cvUrl = safeUrl(body.cv_url, "cv_url");
  if (!cvUrl) {
    throw new RequestValidationError("cv_url is required");
  }
  return {
    cv_url: cvUrl,
    cv_filename: optionalString(body.cv_filename, "cv_filename", 255) ?? "External CV",
  };
}

export function validationErrorResponse(error: unknown): Response | null {
  if (!(error instanceof RequestValidationError)) return null;
  return Response.json({ error: error.message }, { status: error.status });
}
