"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  GraduationCap,
  Upload,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Check,
  AlertCircle,
  LogOut,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import styles from "./admin.module.scss";
import { DbProject, DbExperience, DbCvSetting, PortfolioData } from "@/types/database";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { defaultProjects, defaultExperiences, defaultCvSetting } from "@/lib/supabase/data";

type TabType = "cv" | "projects" | "experience";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<TabType>("cv");
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Data states
  const [cvSetting, setCvSetting] = useState<DbCvSetting>(defaultCvSetting);
  const [projects, setProjects] = useState<DbProject[]>(defaultProjects);
  const [experiences, setExperiences] = useState<DbExperience[]>(defaultExperiences);

  // Upload states
  const [uploadingCv, setUploadingCv] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [reorderingProjects, setReorderingProjects] = useState<boolean>(false);
  const [reorderingExperiences, setReorderingExperiences] = useState<boolean>(false);
  const [manualCvUrl, setManualCvUrl] = useState<string>("");

  // Modals
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  const [editingExperience, setEditingExperience] = useState<DbExperience | null>(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState<boolean>(false);

  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);

  const handleOpenNewProject = () => {
    setEditingProject({
      id: `new-${Date.now()}`,
      title: "",
      title_en: "",
      description: "",
      description_en: "",
      image: "",
      href: "",
      order_index: projects.length,
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenNewExperience = () => {
    setEditingExperience({
      id: `new-${Date.now()}`,
      period: "",
      period_en: "",
      role: "",
      role_en: "",
      description: "",
      description_en: "",
      details: [""],
      order_index: experiences.length,
    });
    setIsExperienceModalOpen(true);
  };

  // Helper for authenticated API calls
  const getAuthHeaders = (isJson = true) => {
    const headers: Record<string, string> = {};
    if (isJson) headers["Content-Type"] = "application/json";
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    return headers;
  };

  // Restore session
  useEffect(() => {
    const initAuth = async () => {
      const client = getSupabaseBrowserClient();
      if (client) {
        const { data } = await client.auth.getSession();
        if (data?.session) {
          setAuthToken(data.session.access_token);
          setCurrentUserEmail(data.session.user.email || "Admin");
          setIsAuthenticated(true);
          return;
        }
      }

    };

    initAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const client = getSupabaseBrowserClient();
      if (!client) {
        setAuthError("Supabase Auth belum dikonfigurasi.");
        return;
      }

      const { data, error } = await client.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passwordInput,
      });

      if (!error && data?.session) {
        const token = data.session.access_token;
        setAuthToken(token);
        setCurrentUserEmail(data.user.email || emailInput);
        setIsAuthenticated(true);
        showToast("Login berhasil! Terhubung dengan Supabase Auth.");
        return;
      }

      setAuthError(error?.message || "Email atau Password salah.");
    } catch (err) {
      setAuthError((err as Error).message || "Gagal masuk. Periksa kembali email dan password.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const client = getSupabaseBrowserClient();
    if (client) {
      await client.auth.signOut().catch(() => {});
    }
    setIsAuthenticated(false);
    setAuthToken("");
    setCurrentUserEmail("");
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio", { cache: "no-store" });
      if (res.ok) {
        const data: PortfolioData = await res.json();
        if (data.projects?.length > 0) setProjects(data.projects);
        if (data.experiences?.length > 0) setExperiences(data.experiences);
        if (data.cv) {
          setCvSetting(data.cv);
          setManualCvUrl(data.cv.cv_url || "");
        }
      }
    } catch (err) {
      console.error("Failed to load portfolio data:", err);
      showToast("Gagal memuat data dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // CV Handlers
  const handleCvFileUpload = async (file: File) => {
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      showToast("Harap pilih file berformat PDF", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran CV maksimal 5 MB", "error");
      return;
    }

    setUploadingCv(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "cv");
      formData.append("isCv", "true");

      const headers: Record<string, string> = {};
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch("/api/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gagal mengunggah CV");
      }

      setCvSetting({
        id: "main",
        cv_url: result.url,
        cv_filename: result.fileName,
        updated_at: new Date().toISOString(),
      });
      setManualCvUrl(result.url);
      showToast("CV berhasil diunggah dan disimpan ke Supabase!");
    } catch (err) {
      console.error(err);
      showToast((err as Error).message || "Gagal mengunggah CV", "error");
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSaveManualCvUrl = async () => {
    if (!manualCvUrl.trim()) return;

    try {
      const res = await fetch("/api/admin/cv", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ cv_url: manualCvUrl.trim() }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan URL CV");

      setCvSetting((prev) => ({
        ...prev,
        cv_url: manualCvUrl.trim(),
        cv_filename: "External CV Link",
      }));
      showToast("URL CV berhasil diperbarui!");
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  };

  // Project Image Upload Handler
  const handleProjectImageUpload = async (file: File) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      showToast("Ukuran gambar maksimal 4 MB", "error");
      return;
    }
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

      const headers: Record<string, string> = {};
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch("/api/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal upload gambar");

      setEditingProject((prev) =>
        prev ? { ...prev, image: result.url } : null
      );
      showToast("Gambar project berhasil diunggah!");
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Project Save Handler
  // Project Save Handler
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const isNew = editingProject.id.startsWith("new-") || !editingProject.id;
      const payload = {
        ...editingProject,
        title_en: editingProject.title_en || editingProject.title,
        description_en: editingProject.description_en || editingProject.description,
        order_index: isNew ? projects.length : editingProject.order_index,
      };

      const res = await fetch("/api/admin/projects", {
        method: isNew ? "POST" : "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan project");

      if (isNew) {
        setProjects((prev) => [...prev, result.data || payload]);
      } else {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? (result.data || payload) : p))
        );
      }

      showToast("Project berhasil disimpan!");
      setIsProjectModalOpen(false);
      setEditingProject(null);
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  };

  // Project Delete
  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Hapus project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAuthHeaders(false),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menghapus project");

      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast(`Project "${title}" berhasil dihapus`);
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  };

  // Project Move Reorder
  const handleMoveProject = async (index: number, direction: "up" | "down") => {
    if (reorderingProjects) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const previous = projects;
    const updated = [...previous];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((p, idx) => ({ ...p, order_index: idx }));
    setProjects(reordered);
    setReorderingProjects(true);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          reorder: true,
          items: reordered.map(({ id, order_index }) => ({ id, order_index })),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memperbarui urutan project");
      showToast("Urutan project diperbarui");
    } catch (err) {
      setProjects(previous);
      showToast((err as Error).message, "error");
    } finally {
      setReorderingProjects(false);
    }
  };

  // Experience Save Handler
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    try {
      const isNew = editingExperience.id.startsWith("new-") || !editingExperience.id;
      const cleanDetails = (editingExperience.details || []).filter((d) => d.trim().length > 0);
      const payload = {
        ...editingExperience,
        details: cleanDetails,
        role_en: editingExperience.role_en || editingExperience.role,
        period_en: editingExperience.period_en || editingExperience.period,
        description_en: editingExperience.description_en || editingExperience.description,
        details_en:
          editingExperience.details_en && editingExperience.details_en.length > 0
            ? editingExperience.details_en
            : cleanDetails,
        order_index: isNew ? experiences.length : editingExperience.order_index,
      };

      const res = await fetch("/api/admin/experiences", {
        method: isNew ? "POST" : "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan pengalaman");

      if (isNew) {
        setExperiences((prev) => [...prev, result.data || payload]);
      } else {
        setExperiences((prev) =>
          prev.map((e) => (e.id === editingExperience.id ? (result.data || payload) : e))
        );
      }

      showToast("Pengalaman berhasil disimpan!");
      setIsExperienceModalOpen(false);
      setEditingExperience(null);
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  };

  // Experience Delete
  const handleDeleteExperience = async (id: string, role: string) => {
    if (!confirm(`Hapus pengalaman "${role}"?`)) return;

    try {
      const res = await fetch(`/api/admin/experiences?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAuthHeaders(false),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menghapus pengalaman");

      setExperiences((prev) => prev.filter((e) => e.id !== id));
      showToast(`Pengalaman "${role}" berhasil dihapus`);
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  };

  // Experience Reorder
  const handleMoveExperience = async (index: number, direction: "up" | "down") => {
    if (reorderingExperiences) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    const previous = experiences;
    const updated = [...previous];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    const reordered = updated.map((e, idx) => ({ ...e, order_index: idx }));
    setExperiences(reordered);
    setReorderingExperiences(true);

    try {
      const res = await fetch("/api/admin/experiences", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          reorder: true,
          items: reordered.map(({ id, order_index }) => ({ id, order_index })),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memperbarui urutan pengalaman");
      showToast("Urutan pengalaman diperbarui");
    } catch (err) {
      setExperiences(previous);
      showToast((err as Error).message, "error");
    } finally {
      setReorderingExperiences(false);
    }
  };

  // Seed handler
  const handleSeedData = async (entity: "projects" | "experiences" | "all") => {
    if (!confirm(`Isi Supabase dengan data bawaan untuk ${entity}?`)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ entity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal melakukan seeding");

      showToast("Data default berhasil di-seed ke Supabase!");
      fetchData();
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, render login with Supabase Auth
  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.heroCircle} />
        <div className={styles.loginWrapper}>
          <div className={styles.loginCard}>
            <div className={styles.loginIcon}>
              <ShieldCheck size={28} />
            </div>
            <p className={styles.eyebrow}>ADMINISTRATOR ACCESS</p>
            <h2>Portfolio Admin Login</h2>
            <p>Masukkan kredensial admin untuk masuk ke dashboard.</p>

            <form onSubmit={handleLogin} autoComplete="off">
              <div className={styles.formGroup}>
                <label style={{ textAlign: "left" }}>Email Admin</label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label style={{ textAlign: "left" }}>Password</label>
                <input
                  type="password"
                  placeholder="Masukkan Password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              {authError ? <small className={styles.loginError}>{authError}</small> : null}

              <button type="submit" className={styles.primaryBtn} disabled={authLoading}>
                {authLoading ? "Memverifikasi..." : "Masuk ke Admin CMS"} <ChevronRight size={16} />
              </button>
            </form>

            <div className={styles.loginFooter}>
              <Link href="/" className={styles.secondaryBtn} style={{ width: "100%", boxSizing: "border-box" }}>
                ← Kembali ke Website Utama
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.heroCircle} />
      <div className={styles.wrapper}>
        {/* Page Heading */}
        <div className={styles.pageHeading}>
          <div className={styles.pageHeadingFlex}>
            <div>
              <p className={styles.eyebrow}>CMS ADMIN</p>
              <h1>Kelola Portofolio</h1>
              <p className={styles.lead}>
                Kelola file CV, daftar project, dan riwayat pengalaman kerja.
              </p>
            </div>
            <div className={styles.headingRight}>
              <div className={styles.userStatusPill}>
                <span className={styles.statusPulse} />
                <span>{currentUserEmail}</span>
              </div>
              <div className={styles.desktopActions}>
                <Link href="/" target="_blank" className={styles.navLinkBtn} title="Lihat Website di Tab Baru">
                  <ExternalLink size={14} /> Buka Website
                </Link>
                <button onClick={fetchData} className={styles.navLinkBtn} title="Refresh Data">
                  <RefreshCw size={14} /> Refresh
                </button>
                <button onClick={handleLogout} className={styles.navLogoutBtn} title="Keluar">
                  <LogOut size={14} /> Keluar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <div className={styles.tabsContainer}>
          <nav className={styles.tabs} aria-label="Admin Navigation Tabs">
            <button
              className={`${styles.tab} ${activeTab === "cv" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("cv")}
            >
              <FileText size={15} /> Upload CV
            </button>
            <button
              className={`${styles.tab} ${activeTab === "projects" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <Briefcase size={15} /> Projects
              <span className={styles.tabBadge}>{projects.length}</span>
            </button>
            <button
              className={`${styles.tab} ${activeTab === "experience" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("experience")}
            >
              <GraduationCap size={15} /> Experience
              <span className={styles.tabBadge}>{experiences.length}</span>
            </button>
          </nav>
        </div>

        {/* TAB 1: CV MANAGEMENT */}
        {activeTab === "cv" && (
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Dokumen CV</h2>
              </div>
            </div>

            {/* Upload Zone */}
            <div
              className={styles.dropzone}
              onClick={() => cvFileInputRef.current?.click()}
            >
              <input
                ref={cvFileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleCvFileUpload(file);
                }}
              />
              <Upload className={styles.dropzoneIcon} />
              <h4>{uploadingCv ? "Mengunggah CV ke Supabase..." : "Klik atau seret file CV PDF ke sini"}</h4>
              <p>Mendukung format file .PDF (Maksimal 5MB)</p>
            </div>

            {/* Active CV Card */}
            <div
              className={styles.activeFileCard}
              data-has-cv={cvSetting.cv_url?.trim() ? "true" : "false"}
            >
              <div className={styles.fileMeta}>
                <div className={styles.fileIcon}>
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className={styles.fileName}>
                    {cvSetting.cv_filename || "Belum ada file CV yang diunggah"}
                  </h4>
                  <p className={styles.fileDate}>
                    {cvSetting.updated_at
                      ? `Terakhir diperbarui: ${new Date(cvSetting.updated_at).toLocaleString("id-ID")}`
                      : "File default aktif"}
                  </p>
                </div>
              </div>

              {cvSetting.cv_url ? (
                <div className={styles.activeFileActions}>
                  <a
                    href={cvSetting.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    <ExternalLink size={14} /> Lihat / Download CV
                  </a>
                </div>
              ) : null}
            </div>

            {/* Manual URL Input */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <div className={styles.formGroup}>
                <label>Atau masukkan URL eksternal CV (Google Drive, Dropbox, dll.):</label>
                <div className={styles.inputWithAction}>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... atau URL dokumen"
                    value={manualCvUrl}
                    onChange={(e) => setManualCvUrl(e.target.value)}
                  />
                  <button onClick={handleSaveManualCvUrl} className={styles.primaryBtn}>
                    Simpan URL
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === "projects" && (
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Daftar Project</h2>
              </div>

              <div className={styles.headerActions}>
                <button
                  onClick={handleOpenNewProject}
                  className={styles.primaryBtn}
                >
                  <Plus size={16} /> Tambah Project
                </button>
                <button
                  onClick={() => handleSeedData("projects")}
                  className={styles.secondaryBtn}
                  title="Isi ulang data default ke database"
                >
                  <RefreshCw size={14} /> Seed Default
                </button>
              </div>
            </div>

            <div className={styles.itemList}>
              {projects.map((project, index) => (
                <div key={project.id || index} className={styles.itemCard}>
                  <div className={styles.itemMain}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.itemThumb}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className={styles.itemThumb} style={{ display: "grid", placeItems: "center" }}>
                        <Briefcase size={20} color="rgba(255,255,255,0.4)" />
                      </div>
                    )}
                    <div className={styles.itemContent}>
                      <div className={styles.itemTitle}>
                        {project.title}
                        <span className={styles.itemBadge}>Urutan #{index + 1}</span>
                      </div>
                      <p className={styles.itemDesc}>{project.description}</p>
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.itemLink}
                        >
                          {project.href} ↗
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      onClick={() => handleMoveProject(index, "up")}
                      disabled={reorderingProjects || index === 0}
                      className={styles.iconBtn}
                      title="Pindahkan ke atas"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => handleMoveProject(index, "down")}
                      disabled={reorderingProjects || index === projects.length - 1}
                      className={styles.iconBtn}
                      title="Pindahkan ke bawah"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject({ ...project });
                        setIsProjectModalOpen(true);
                      }}
                      className={styles.iconBtn}
                      title="Edit project"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id, project.title)}
                      className={`${styles.iconBtn} ${styles.delete}`}
                      title="Hapus project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === "experience" && (
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Pengalaman Kerja</h2>
              </div>

              <div className={styles.headerActions}>
                <button
                  onClick={handleOpenNewExperience}
                  className={styles.primaryBtn}
                >
                  <Plus size={16} /> Tambah Pengalaman
                </button>
                <button
                  onClick={() => handleSeedData("experiences")}
                  className={styles.secondaryBtn}
                  title="Isi ulang data default ke database"
                >
                  <RefreshCw size={14} /> Seed Default
                </button>
              </div>
            </div>

            <div className={styles.itemList}>
              {experiences.map((exp, index) => (
                <div key={exp.id || index} className={styles.itemCard}>
                  <div className={styles.itemMain}>
                    <div className={styles.itemContent}>
                      <div className={styles.itemTitle}>
                        {exp.role}
                        <span className={styles.itemBadge}>{exp.period}</span>
                        <span className={styles.itemBadge}>Urutan #{index + 1}</span>
                      </div>
                      <p className={styles.itemDesc}>{exp.description}</p>
                      {exp.details && exp.details.length > 0 ? (
                        <ul className={styles.detailList}>
                          {exp.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      onClick={() => handleMoveExperience(index, "up")}
                      disabled={reorderingExperiences || index === 0}
                      className={styles.iconBtn}
                      title="Pindahkan ke atas"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => handleMoveExperience(index, "down")}
                      disabled={reorderingExperiences || index === experiences.length - 1}
                      className={styles.iconBtn}
                      title="Pindahkan ke bawah"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingExperience({ ...exp });
                        setIsExperienceModalOpen(true);
                      }}
                      className={styles.iconBtn}
                      title="Edit pengalaman"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id, exp.role)}
                      className={`${styles.iconBtn} ${styles.delete}`}
                      title="Hapus pengalaman"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* MODAL: ADD / EDIT PROJECT */}
        {isProjectModalOpen && editingProject && (
          <div className={styles.modalBackdrop} onClick={() => setIsProjectModalOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHead}>
                <h3>{editingProject.id.startsWith("new-") ? "Tambah Project Baru" : "Edit Project"}</h3>
                <button className={styles.modalClose} onClick={() => setIsProjectModalOpen(false)}>✕</button>
              </div>

              <form onSubmit={handleSaveProject}>
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label>Judul Project *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                          title_en: e.target.value,
                        })
                      }
                      placeholder="Contoh: DiProperti"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Deskripsi Project *</label>
                    <textarea
                      rows={4}
                      required
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                          description_en: e.target.value,
                        })
                      }
                      placeholder="Jelaskan ringkasan teknologi, peran, dan dampak project..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Gambar / Thumbnail Project</label>
                    <div className={styles.inputWithAction}>
                      <input
                        type="text"
                        value={editingProject.image || ""}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image: e.target.value })
                        }
                        placeholder="/image/projects/... atau https://..."
                      />
                      <input
                        ref={projectImageInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleProjectImageUpload(file);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => projectImageInputRef.current?.click()}
                        className={styles.secondaryBtn}
                      >
                        <Upload size={14} /> {uploadingImage ? "Mengunggah..." : "Upload Foto"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Link / URL Project</label>
                    <input
                      type="text"
                      value={editingProject.href || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, href: e.target.value })
                      }
                      placeholder="https://... atau #contact"
                    />
                  </div>
                </div>

                <div className={styles.modalFoot}>
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className={styles.secondaryBtn}
                  >
                    Batal
                  </button>
                  <button type="submit" className={styles.primaryBtn}>
                    Simpan Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT EXPERIENCE */}
        {isExperienceModalOpen && editingExperience && (
          <div className={styles.modalBackdrop} onClick={() => setIsExperienceModalOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHead}>
                <h3>{editingExperience.id.startsWith("new-") ? "Tambah Pengalaman Baru" : "Edit Pengalaman"}</h3>
                <button className={styles.modalClose} onClick={() => setIsExperienceModalOpen(false)}>✕</button>
              </div>

              <form onSubmit={handleSaveExperience}>
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label>Posisi / Peran *</label>
                    <input
                      type="text"
                      required
                      value={editingExperience.role}
                      onChange={(e) =>
                        setEditingExperience({
                          ...editingExperience,
                          role: e.target.value,
                          role_en: e.target.value,
                        })
                      }
                      placeholder="Contoh: Founder Nusticky / Full-Stack Engineer"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Periode Waktu *</label>
                    <input
                      type="text"
                      required
                      value={editingExperience.period}
                      onChange={(e) =>
                        setEditingExperience({ ...editingExperience, period: e.target.value })
                      }
                      placeholder="Contoh: Nov 2023 - Present"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Deskripsi Singkat *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingExperience.description}
                      onChange={(e) =>
                        setEditingExperience({ ...editingExperience, description: e.target.value })
                      }
                      placeholder="Ringkasan tugas atau peran utama..."
                    />
                  </div>

                  {/* Bullet points */}
                  <div className={styles.formGroup}>
                    <label>Poin-poin Detail Pencapaian (Bullet Points):</label>
                    <div className={styles.dynamicList}>
                      {editingExperience.details.map((detail, idx) => (
                        <div key={idx} className={styles.dynamicRow}>
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) => {
                              const updated = [...editingExperience.details];
                              updated[idx] = e.target.value;
                              setEditingExperience({ ...editingExperience, details: updated });
                            }}
                            placeholder={`Poin detail #${idx + 1}`}
                            style={{ flex: 1 }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingExperience.details.filter((_, i) => i !== idx);
                              setEditingExperience({ ...editingExperience, details: updated });
                            }}
                            className={styles.iconBtn}
                            title="Hapus poin"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          setEditingExperience({
                            ...editingExperience,
                            details: [...editingExperience.details, ""],
                          });
                        }}
                        className={styles.secondaryBtn}
                        style={{ alignSelf: "flex-start", marginTop: 4 }}
                      >
                        <Plus size={14} /> Tambah Poin Detail
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.modalFoot}>
                  <button
                    type="button"
                    onClick={() => setIsExperienceModalOpen(false)}
                    className={styles.secondaryBtn}
                  >
                    Batal
                  </button>
                  <button type="submit" className={styles.primaryBtn}>
                    Simpan Pengalaman
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MOBILE BOTTOM BAR (Uniform 5-Item Navigation) */}
        <nav className={styles.mobileBottomBar} aria-label="Mobile Navigation">
          <button
            type="button"
            className={`${styles.mobileTabItem} ${activeTab === "cv" ? styles.activeMobileTab : ""}`}
            onClick={() => setActiveTab("cv")}
          >
            <FileText size={18} />
            <span>CV</span>
          </button>

          <button
            type="button"
            className={`${styles.mobileTabItem} ${activeTab === "projects" ? styles.activeMobileTab : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <div className={styles.iconWithBadge}>
              <Briefcase size={18} />
              <span className={styles.mobileBadge}>{projects.length}</span>
            </div>
            <span>Project</span>
          </button>

          <button
            type="button"
            className={`${styles.mobileTabItem} ${activeTab === "experience" ? styles.activeMobileTab : ""}`}
            onClick={() => setActiveTab("experience")}
          >
            <div className={styles.iconWithBadge}>
              <GraduationCap size={18} />
              <span className={styles.mobileBadge}>{experiences.length}</span>
            </div>
            <span>Experience</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className={styles.mobileTabItem}
            title="Lihat Website di Tab Baru"
          >
            <ExternalLink size={18} />
            <span>Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={`${styles.mobileTabItem} ${styles.mobileLogoutItem}`}
            title="Keluar dari Admin"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </nav>

        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className={`${styles.toast} ${styles[toast.type]}`}>
            {toast.type === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
