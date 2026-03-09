import React, { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { category: "BI & Visualization", items: ["Power BI", "DAX", "Power Query (M)", "MSBI", "Advanced Excel"], color: "#00d4aa" },
  { category: "Databases & Warehousing", items: ["SQL Server", "MySQL", "Snowflake", "Star/Snowflake Schema", "ETL Development"], color: "#3b82f6" },
  { category: "Cloud & Platforms", items: ["Microsoft Azure", "AWS", "Azure Boards", "SharePoint", "Agile/Scrum"], color: "#a78bfa" },
  { category: "Data & Governance", items: ["Data Profiling", "Data Cleansing", "RLS", "KPI Scorecards", "Compliance"], color: "#f59e0b" },
  { category: "Other Tools", items: ["ServiceNow", "CRM", "SWIFT", "Figma", "HTML/CSS"], color: "#f472b6" },
];

const CERTIFICATIONS = [
  { org: "Microsoft", certs: ["Power BI Data Analyst Associate", "DP-203 Data Engineering on Azure", "AZ-900 Azure Fundamentals", "Data Engineer Cloud Data Platform"] },
  { org: "AWS", certs: ["Certified Cloud Practitioner"] },
  { org: "Snowflake", certs: ["SnowPro Core Certification"] },
  { org: "Agile", certs: ["Agile Software Development"] },
];

const PROJECTS = [
  {
    title: "Executive C-Suite Power BI Dashboard",
    description: "Designed executive-level Power BI dashboards with Row-Level Security, forecasting models, and KPI scorecards for C-suite stakeholders.",
    impact: "Reduced decision-making time by 30%",
    tech: ["Power BI", "DAX", "RLS", "KPI Scorecards"],
    icon: "📊",
  },
  {
    title: "Snowflake Data Warehouse Optimization",
    description: "Optimized Snowflake data warehouse queries and dimensional models using Star/Snowflake schemas to improve performance.",
    impact: "Reduced query costs & improved refresh by 40%",
    tech: ["Snowflake", "SQL", "Star Schema", "ETL"],
    icon: "❄️",
  },
  {
    title: "Healthcare Insurance Data Analytics",
    description: "Performed data analysis and profiling on healthcare insurance datasets, resolving inconsistencies across 10M+ records using data controls techniques.",
    impact: "Resolved 10M+ record inconsistencies",
    tech: ["SQL", "Power BI", "Data Profiling", "Data Cleansing"],
    icon: "🏥",
  },
  {
    title: "ServiceNow Integrated Dashboards",
    description: "Developed ServiceNow dashboards integrated with workflow tables to eliminate manual reporting across multiple business units.",
    impact: "Improved tracking accuracy by 40%",
    tech: ["ServiceNow", "Power BI", "SQL", "Workflow Integration"],
    icon: "⚙️",
  },
  {
    title: "Automated Reporting Pipeline",
    description: "Built advanced Power BI reports using DAX measures, Power Query transformations, and dimensional modelling to automate reporting cycles.",
    impact: "Cut reporting from 3 days → 3 hours",
    tech: ["Power BI", "DAX", "Power Query", "Dimensional Modelling"],
    icon: "⚡",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function GridBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }} />
  );
}

function StatBadge({ value, label }) {
  return (
    <div style={{
      background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.25)",
      borderRadius: 12, padding: "20px 28px", textAlign: "center",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: "#00d4aa", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function SkillCard({ category, items, color, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.8)", border: `1px solid ${color}30`,
      borderRadius: 16, padding: "28px 24px", backdropFilter: "blur(12px)",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease ${delay}s`, borderTop: `3px solid ${color}`,
    }}>
      <h3 style={{ color, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
        {category}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map(item => (
          <span key={item} style={{
            background: `${color}15`, border: `1px solid ${color}40`,
            color: "#e2e8f0", borderRadius: 6, padding: "5px 12px", fontSize: 13, fontFamily: "'DM Mono', monospace",
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,212,170,0.06)" : "rgba(15,23,42,0.7)",
        border: `1px solid ${hovered ? "rgba(0,212,170,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16, padding: "28px", backdropFilter: "blur(12px)",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${delay}s`, cursor: "default",
      }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{project.icon}</div>
      <h3 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{project.description}</p>
      <div style={{
        background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)",
        borderRadius: 8, padding: "8px 14px", marginBottom: 16, display: "inline-block",
      }}>
        <span style={{ color: "#00d4aa", fontSize: 13, fontWeight: 600 }}>⚡ {project.impact}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tech.map(t => (
          <span key={t} style={{
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
            color: "#93c5fd", borderRadius: 4, padding: "3px 10px", fontSize: 12, fontFamily: "'DM Mono', monospace",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: "100px 0", position: "relative", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ color: "#00d4aa", fontSize: 11, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>
        — {label}
      </div>
      <h2 style={{ color: "#f1f5f9", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Load fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const container = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };

  return (
    <div style={{ background: "#060d1a", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <GridBackground />

      {/* Glow orbs */}
      <div style={{ position: "fixed", top: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,13,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,170,0.12)" : "none",
        transition: "all 0.4s ease", padding: "18px 0",
      }}>
        <div style={{ ...container, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>
            <span style={{ color: "#00d4aa" }}>S</span><span style={{ color: "#f1f5f9" }}>ARANG</span>
            <span style={{ color: "#475569", marginLeft: 8, fontSize: 13, fontWeight: 400, fontFamily: "'DM Mono', monospace" }}>// data analyst</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  background: activeNav === link ? "rgba(0,212,170,0.15)" : "transparent",
                  border: activeNav === link ? "1px solid rgba(0,212,170,0.4)" : "1px solid transparent",
                  color: activeNav === link ? "#00d4aa" : "#94a3b8",
                  padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                  fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  transition: "all 0.2s ease",
                }}>
                {link}
              </button>
            ))}
            <a href="mailto:sarangsatpute74@gmail.com"
              style={{
                background: "rgba(0,212,170,0.9)", color: "#060d1a",
                padding: "7px 18px", borderRadius: 8, fontSize: 14,
                fontWeight: 700, textDecoration: "none", fontFamily: "'Syne', sans-serif",
                transition: "all 0.2s ease",
              }}>
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", paddingTop: 80 }}>
        <div style={container}>
          <div style={{ maxWidth: 800 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 32,
              animation: "fadeDown 0.8s ease forwards",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d4aa", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#00d4aa", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>Open to opportunities · Pune, India</span>
            </div>

            <h1 style={{
              fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 800, lineHeight: 1.0,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 24,
              animation: "fadeUp 0.8s ease 0.1s both",
            }}>
              <span style={{ color: "#f1f5f9" }}>Sarang</span><br />
              <span style={{ color: "#00d4aa" }}>Satpute</span>
            </h1>

            <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#64748b", fontFamily: "'DM Mono', monospace", marginBottom: 20, letterSpacing: "0.02em" }}>
                Associate Consultant · Data Analyst · Power BI Developer
              </p>
              <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.8, maxWidth: 620, marginBottom: 40 }}>
                4+ years turning raw data into strategic decisions. Specialized in Power BI, Snowflake, and SQL — building dashboards that executives actually use.
              </p>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both", marginBottom: 64 }}>
              <button onClick={() => scrollTo("Projects")}
                style={{
                  background: "#00d4aa", color: "#060d1a", border: "none",
                  padding: "14px 32px", borderRadius: 10, fontSize: 15,
                  fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif",
                }}>
                View Projects →
              </button>
              <a href="https://www.linkedin.com/in/sarang-satpute-7a712a17b/" target="_blank" rel="noreferrer"
                style={{
                  background: "transparent", color: "#e2e8f0",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "14px 32px", borderRadius: 10, fontSize: 15,
                  fontWeight: 500, cursor: "pointer", textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                LinkedIn ↗
              </a>
              <a href="https://drive.google.com/uc?export=download&id=1itPtYVhMGyrBjtKwu71_Q11UbZn72e49"
                style={{
                  background: "transparent", color: "#00d4aa",
                  border: "1px solid rgba(0,212,170,0.35)",
                  padding: "14px 32px", borderRadius: 10, fontSize: 15,
                  fontWeight: 500, cursor: "pointer", textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                Resume ↓
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, maxWidth: 580, animation: "fadeUp 0.8s ease 0.4s both" }}>
              <StatBadge value="4+" label="Years Experience" />
              <StatBadge value="10M+" label="Records Analyzed" />
              <StatBadge value="30%" label="Decision Time ↓" />
              <StatBadge value="40%" label="Query Perf. ↑" />
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <Section id="skills">
        <div style={container}>
          <SectionTitle label="Technical Arsenal" title="Skills & Tools" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 60 }}>
            {SKILLS.map((s, i) => <SkillCard key={s.category} {...s} delay={i * 0.1} />)}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 20 }}>
            <h3 style={{ color: "#00d4aa", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24, fontFamily: "'DM Mono', monospace" }}>
              — Certifications
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {CERTIFICATIONS.map(c => (
                <div key={c.org} style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 20px" }}>
                  <div style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 10, fontFamily: "'Syne', sans-serif" }}>{c.org}</div>
                  {c.certs.map(cert => (
                    <div key={cert} style={{ color: "#64748b", fontSize: 13, marginBottom: 4, display: "flex", alignItems: "flex-start", gap: 6 }}>
                      <span style={{ color: "#00d4aa", marginTop: 2 }}>✓</span> {cert}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ background: "rgba(0,212,170,0.015)" }}>
        <div style={container}>
          <SectionTitle label="Work Portfolio" title="Featured Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 0.1} />)}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div style={container}>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <SectionTitle label="Get In Touch" title={<>Let's build something<br /><span style={{ color: "#00d4aa" }}>data-driven</span></>} />
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.8, marginBottom: 48 }}>
              Looking for a BI developer who bridges business and tech? I'd love to connect about data analytics, Power BI solutions, or new opportunities.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
              {[
                { label: "Email", value: "sarangsatpute74@gmail.com", href: "mailto:sarangsatpute74@gmail.com", icon: "✉" },
                { label: "Phone", value: "+91-9763686803", href: "tel:+919763686803", icon: "☎" },
                { label: "Location", value: "Pune, India", href: null, icon: "📍" },
              ].map(c => (
                <div key={c.label} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(0,212,170,0.15)", borderRadius: 12, padding: "20px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ color: "#00d4aa", fontSize: 14, textDecoration: "none" }}>{c.value}</a>
                  ) : (
                    <span style={{ color: "#94a3b8", fontSize: 14 }}>{c.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/sarang-satpute-7a712a17b/" target="_blank" rel="noreferrer"
                style={{
                  background: "#0077b5", color: "#fff",
                  padding: "14px 36px", borderRadius: 10, fontSize: 15,
                  fontWeight: 700, textDecoration: "none", fontFamily: "'Syne', sans-serif",
                }}>
                LinkedIn ↗
              </a>
              <a href="https://drive.google.com/uc?export=download&id=1itPtYVhMGyrBjtKwu71_Q11UbZn72e49"
                style={{
                  background: "rgba(0,212,170,0.15)", color: "#00d4aa",
                  border: "1px solid rgba(0,212,170,0.4)",
                  padding: "14px 36px", borderRadius: 10, fontSize: 15,
                  fontWeight: 700, textDecoration: "none", fontFamily: "'Syne', sans-serif",
                }}>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 0", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
          © 2025 Sarang Satpute · Data Analyst · Power BI Developer · Pune, India
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #060d1a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,170,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}