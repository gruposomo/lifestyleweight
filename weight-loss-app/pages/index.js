import { useState } from "react";

const SECTIONS = [
  {
    id: "patient", title: "Patient Information", icon: "👤",
    fields: [
      { id: "firstName", label: "First Name", type: "text", placeholder: "First name" },
      { id: "lastName", label: "Last Name", type: "text", placeholder: "Last name" },
      { id: "dob", label: "Date of Birth", type: "date" },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
      { id: "ethnicity", label: "Ethnicity", type: "select", options: ["White / Caucasian", "Black / African American", "Hispanic / Latino", "Asian", "Middle Eastern", "Mixed / Other", "Prefer not to say"] },
      { id: "referral", label: "Referred by", type: "text", placeholder: "GP name or self-referred" },
    ],
  },
  {
    id: "biometrics", title: "Biometrics & Vitals", icon: "📏",
    fields: [
      { id: "weight", label: "Current Weight (kg)", type: "number", placeholder: "e.g. 95" },
      { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 170" },
      { id: "waist", label: "Waist Circumference (cm)", type: "number", placeholder: "e.g. 102" },
      { id: "hip", label: "Hip Circumference (cm)", type: "number", placeholder: "e.g. 110" },
      { id: "bp_sys", label: "Blood Pressure Systolic (mmHg)", type: "number", placeholder: "e.g. 130" },
      { id: "bp_dia", label: "Blood Pressure Diastolic (mmHg)", type: "number", placeholder: "e.g. 85" },
      { id: "hr", label: "Resting Heart Rate (bpm)", type: "number", placeholder: "e.g. 78" },
      { id: "goalWeight", label: "Goal Weight (kg)", type: "number", placeholder: "e.g. 80" },
    ],
  },
  {
    id: "history", title: "Medical History", icon: "🏥",
    fields: [
      { id: "conditions", label: "Current Medical Conditions", type: "textarea", placeholder: "e.g. Type 2 diabetes, hypertension, sleep apnoea..." },
      { id: "medications", label: "Current Medications", type: "textarea", placeholder: "List all medications and doses..." },
      { id: "previousWeightLoss", label: "Previous Weight Loss Attempts", type: "textarea", placeholder: "e.g. Keto diet (2022, lost 8kg then regained), Ozempic (6 months)..." },
      { id: "familyHistory", label: "Family History (weight-related)", type: "textarea", placeholder: "e.g. Father has T2DM, mother had bariatric surgery..." },
      { id: "surgeries", label: "Previous Surgeries", type: "text", placeholder: "e.g. Appendectomy 2010, none" },
      { id: "allergies", label: "Allergies", type: "text", placeholder: "e.g. Penicillin, shellfish, none known" },
      { id: "menstrual", label: "Menstrual / Hormonal Notes (if applicable)", type: "text", placeholder: "e.g. PCOS, menopause, regular cycles" },
    ],
  },
  {
    id: "lifestyle", title: "Lifestyle Assessment", icon: "🌿",
    fields: [
      { id: "diet", label: "Typical Daily Diet", type: "textarea", placeholder: "Describe a typical day of eating..." },
      { id: "dietPattern", label: "Dietary Pattern", type: "select", options: ["No specific pattern", "Mediterranean", "Low carb / Keto", "Vegan / Plant-based", "Vegetarian", "Intermittent fasting", "Calorie counting", "Other"] },
      { id: "calories", label: "Estimated Daily Calories", type: "select", options: ["Less than 1200 kcal", "1200–1500 kcal", "1500–2000 kcal", "2000–2500 kcal", "More than 2500 kcal", "Not sure"] },
      { id: "exercise", label: "Exercise Frequency", type: "select", options: ["None", "1–2 days/week", "3–4 days/week", "5+ days/week"] },
      { id: "exerciseType", label: "Type of Exercise", type: "text", placeholder: "e.g. Walking, gym, swimming, cycling" },
      { id: "sleep", label: "Average Sleep (hours/night)", type: "select", options: ["Less than 5", "5–6", "7–8", "More than 8"] },
      { id: "sleepQuality", label: "Sleep Quality", type: "select", options: ["Poor", "Fair", "Good", "Excellent"] },
      { id: "stress", label: "Stress Level", type: "select", options: ["Low", "Moderate", "High", "Very high"] },
      { id: "alcohol", label: "Alcohol Consumption", type: "select", options: ["None", "Occasional (1–2/week)", "Moderate (3–7/week)", "Heavy (8+/week)"] },
      { id: "smoking", label: "Smoking Status", type: "select", options: ["Never smoked", "Ex-smoker", "Current smoker"] },
      { id: "emotionalEating", label: "Emotional Eating", type: "select", options: ["Never", "Occasionally", "Often", "Almost always"] },
      { id: "motivation", label: "Primary Motivation for Weight Loss", type: "textarea", placeholder: "e.g. Health concerns, upcoming event, doctor's advice..." },
    ],
  },
  {
    id: "labs", title: "Recent Lab Results", icon: "🧪",
    fields: [
      { id: "hba1c", label: "HbA1c (%)", type: "text", placeholder: "e.g. 6.2 or N/A" },
      { id: "fasting_glucose", label: "Fasting Glucose (mmol/L)", type: "text", placeholder: "e.g. 5.8 or N/A" },
      { id: "total_chol", label: "Total Cholesterol (mmol/L)", type: "text", placeholder: "e.g. 5.1 or N/A" },
      { id: "ldl", label: "LDL (mmol/L)", type: "text", placeholder: "e.g. 3.2 or N/A" },
      { id: "hdl", label: "HDL (mmol/L)", type: "text", placeholder: "e.g. 1.1 or N/A" },
      { id: "triglycerides", label: "Triglycerides (mmol/L)", type: "text", placeholder: "e.g. 2.1 or N/A" },
      { id: "tsh", label: "TSH (mIU/L)", type: "text", placeholder: "e.g. 2.4 or N/A" },
      { id: "vitD", label: "Vitamin D (nmol/L)", type: "text", placeholder: "e.g. 45 or N/A" },
      { id: "creatinine", label: "Creatinine (umol/L)", type: "text", placeholder: "e.g. 88 or N/A" },
      { id: "alt", label: "ALT / Liver enzymes", type: "text", placeholder: "e.g. 32 or N/A" },
      { id: "labNotes", label: "Additional Lab Notes", type: "textarea", placeholder: "Any other relevant results..." },
    ],
  },
  {
    id: "goals", title: "Goals & Preferences", icon: "🎯",
    fields: [
      { id: "timeline", label: "Desired Timeline", type: "select", options: ["3 months", "6 months", "12 months", "No fixed timeline"] },
      { id: "approach", label: "Preferred Approach", type: "select", options: ["Lifestyle only", "Medication-assisted", "Open to all options", "Considering surgery"] },
      { id: "barriers", label: "Main Barriers to Weight Loss", type: "textarea", placeholder: "e.g. Busy schedule, cravings, lack of motivation..." },
      { id: "support", label: "Support System", type: "select", options: ["Strong (family/partner support)", "Moderate", "Limited", "None"] },
      { id: "clinicianNotes", label: "Clinician Notes (internal)", type: "textarea", placeholder: "Additional observations, clinical impressions..." },
    ],
  },
];

const ACCENT = "#1a6b4a";
const ACCENT2 = "#0d4a33";
const LIGHT = "#f0f7f4";
const BORDER = "#c8dfd6";
const TEXT = "#1a2e25";
const MUTED = "#6b8c7d";

export default function WeightLossConsult() {
  const [section, setSection] = useState(0);
  const [data, setData] = useState({});
  const [screen, setScreen] = useState("form");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const current = SECTIONS[section];
  const progress = (section / SECTIONS.length) * 100;

  function set(id, val) { setData(d => ({ ...d, [id]: val })); }

  function bmi() {
    const w = parseFloat(data.weight), h = parseFloat(data.height) / 100;
    if (!w || !h) return null;
    return (w / (h * h)).toFixed(1);
  }
  function whr() {
    const w = parseFloat(data.waist), h = parseFloat(data.hip);
    if (!w || !h) return null;
    return (w / h).toFixed(2);
  }
  function age() {
    if (!data.dob) return null;
    return Math.floor((Date.now() - new Date(data.dob).getTime()) / (365.25 * 24 * 3600 * 1000));
  }

  function buildPrompt() {
    const bmiVal = bmi(), whrVal = whr(), ageVal = age();
    const toWt = data.goalWeight && data.weight ? (parseFloat(data.weight) - parseFloat(data.goalWeight)).toFixed(1) : "N/A";
    return `You are an experienced obesity medicine physician. Generate a comprehensive, structured clinical consultation summary.

PATIENT:
Name: ${data.firstName || ""} ${data.lastName || ""} | Age: ${ageVal || "N/A"} | Gender: ${data.gender || "N/A"} | Ethnicity: ${data.ethnicity || "N/A"}
Referred by: ${data.referral || "N/A"}

BIOMETRICS:
Weight: ${data.weight || "N/A"} kg | Height: ${data.height || "N/A"} cm | BMI: ${bmiVal || "N/A"} kg/m²
Waist: ${data.waist || "N/A"} cm | Hip: ${data.hip || "N/A"} cm | WHR: ${whrVal || "N/A"}
BP: ${data.bp_sys || "N/A"}/${data.bp_dia || "N/A"} mmHg | HR: ${data.hr || "N/A"} bpm
Goal: ${data.goalWeight || "N/A"} kg (to lose: ${toWt} kg)

MEDICAL HISTORY:
Conditions: ${data.conditions || "None"}
Medications: ${data.medications || "None"}
Previous attempts: ${data.previousWeightLoss || "None"}
Family history: ${data.familyHistory || "N/A"}
Surgeries: ${data.surgeries || "None"} | Allergies: ${data.allergies || "None"}
Hormonal: ${data.menstrual || "N/A"}

LIFESTYLE:
Diet: ${data.diet || "N/A"} | Pattern: ${data.dietPattern || "N/A"} | Calories: ${data.calories || "N/A"}
Exercise: ${data.exercise || "N/A"} — ${data.exerciseType || "N/A"}
Sleep: ${data.sleep || "N/A"} hrs, quality: ${data.sleepQuality || "N/A"}
Stress: ${data.stress || "N/A"} | Alcohol: ${data.alcohol || "N/A"} | Smoking: ${data.smoking || "N/A"}
Emotional eating: ${data.emotionalEating || "N/A"}
Motivation: ${data.motivation || "N/A"}

LABS:
HbA1c: ${data.hba1c || "N/A"} | Glucose: ${data.fasting_glucose || "N/A"}
Cholesterol: ${data.total_chol || "N/A"} | LDL: ${data.ldl || "N/A"} | HDL: ${data.hdl || "N/A"} | TG: ${data.triglycerides || "N/A"}
TSH: ${data.tsh || "N/A"} | Vit D: ${data.vitD || "N/A"} | Creatinine: ${data.creatinine || "N/A"} | ALT: ${data.alt || "N/A"}
Notes: ${data.labNotes || "N/A"}

GOALS:
Timeline: ${data.timeline || "N/A"} | Approach: ${data.approach || "N/A"}
Barriers: ${data.barriers || "N/A"} | Support: ${data.support || "N/A"}
Clinician notes: ${data.clinicianNotes || "N/A"}

Write a professional clinical summary with sections:
**Clinical Impression**
**Key Risk Factors**
**Metabolic Profile**
**Lifestyle Analysis**
**Recommended Investigations**
**Treatment Considerations**
**Suggested Management Plan**
**Follow-up Recommendations**

Be precise and evidence-based. Flag urgent concerns clearly.`;
  }

  async function generateSummary() {
    setScreen("loading");
    setError("");
    try {
      const res = await fetch("/api/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error);
      setSummary(d.text);
      setScreen("summary");
    } catch (e) {
      setError(e.message);
      setScreen("summary");
    }
  }

  function handleCopy() {
    const name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Patient";
    navigator.clipboard.writeText(`WEIGHT LOSS CONSULTATION SUMMARY\nPatient: ${name} | BMI: ${bmi() || "N/A"}\nDate: ${new Date().toLocaleDateString()}\n\n${summary}`)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); });
  }

  function renderField(f) {
    const val = data[f.id] || "";
    const base = {
      width: "100%", padding: "10px 14px", fontSize: 14,
      border: `1.5px solid ${BORDER}`, borderRadius: 8,
      fontFamily: "inherit", background: "#fff", color: TEXT,
      outline: "none", boxSizing: "border-box",
    };
    if (f.type === "textarea") return <textarea value={val} onChange={e => set(f.id, e.target.value)} placeholder={f.placeholder} rows={3} style={{ ...base, resize: "vertical", lineHeight: 1.6 }} />;
    if (f.type === "select") return (
      <select value={val} onChange={e => set(f.id, e.target.value)} style={{ ...base, cursor: "pointer" }}>
        <option value="">Select...</option>
        {f.options.map(o => <option key={o}>{o}</option>)}
      </select>
    );
    return <input type={f.type} value={val} onChange={e => set(f.id, e.target.value)} placeholder={f.placeholder} style={base} />;
  }

  function renderMarkdown(text) {
    return text.split("\n").map((line, i) => {
      if (/^\*\*.*\*\*$/.test(line.trim()))
        return <div key={i} style={{ fontWeight: 700, color: ACCENT2, fontSize: 14, marginTop: 20, marginBottom: 6, borderBottom: `1px solid ${BORDER}`, paddingBottom: 4 }}>{line.replace(/\*\*/g, "")}</div>;
      if (/\*\*/.test(line)) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return <p key={i} style={{ color: TEXT, fontSize: 13, lineHeight: 1.75, margin: "3px 0" }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>;
      }
      if (/^[-•]\s|^\d+\.\s/.test(line))
        return <p key={i} style={{ color: "#334", fontSize: 13, lineHeight: 1.7, paddingLeft: 14, margin: "3px 0" }}>• {line.replace(/^[-•]\s|^\d+\.\s/, "")}</p>;
      if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
      return <p key={i} style={{ color: TEXT, fontSize: 13, lineHeight: 1.75, margin: "3px 0" }}>{line}</p>;
    });
  }

  const bmiVal = bmi();
  const name = `${data.firstName || ""} ${data.lastName || ""}`.trim();

  return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${LIGHT}; font-family: 'DM Sans', sans-serif; } select, input, textarea { font-family: inherit; }`}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: ACCENT2, color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6, marginBottom: 2 }}>Weight Loss Medicine</div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17 }}>Initial Consultation</div>
        </div>
        {name && <div style={{ fontSize: 12, opacity: 0.8, background: "rgba(255,255,255,0.12)", padding: "5px 12px", borderRadius: 20 }}>{name}</div>}
      </div>

      {/* FORM */}
      {screen === "form" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px 80px" }}>
          {/* Section tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {SECTIONS.map((s, i) => (
              <button key={s.id} onClick={() => setSection(i)} style={{
                fontSize: 11, padding: "5px 11px", borderRadius: 20,
                border: `1.5px solid ${i === section ? ACCENT : BORDER}`,
                background: i === section ? ACCENT : i < section ? "#d4ede5" : "#fff",
                color: i === section ? "#fff" : i < section ? ACCENT2 : MUTED,
                cursor: "pointer", fontFamily: "inherit", fontWeight: i === section ? 600 : 400,
              }}>{s.icon} {s.title}</button>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, borderRadius: 2, transition: "width 0.4s" }} />
          </div>

          {/* Live BMI strip */}
          {bmiVal && (
            <div style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: MUTED }}>BMI: <strong style={{ color: parseFloat(bmiVal) >= 30 ? "#e05a7a" : parseFloat(bmiVal) >= 25 ? "#e8a838" : ACCENT }}>{bmiVal} kg/m²</strong></span>
              {whr() && <span style={{ fontSize: 12, color: MUTED }}>WHR: <strong style={{ color: TEXT }}>{whr()}</strong></span>}
              {data.weight && data.goalWeight && <span style={{ fontSize: 12, color: MUTED }}>To lose: <strong style={{ color: TEXT }}>{(parseFloat(data.weight) - parseFloat(data.goalWeight)).toFixed(1)} kg</strong></span>}
              {age() && <span style={{ fontSize: 12, color: MUTED }}>Age: <strong style={{ color: TEXT }}>{age()} yrs</strong></span>}
            </div>
          )}

          {/* Fields */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.05)", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: ACCENT2, marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
              {current.icon} {current.title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {current.fields.map(f => (
                <div key={f.id}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{f.label}</label>
                  {renderField(f)}
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setSection(s => Math.max(0, s - 1))} disabled={section === 0}
              style={{ flex: 1, padding: "13px", border: `1.5px solid ${BORDER}`, borderRadius: 10, background: "#fff", color: section === 0 ? BORDER : TEXT, cursor: section === 0 ? "default" : "pointer", fontFamily: "inherit", fontSize: 14 }}>
              ← Back
            </button>
            {section < SECTIONS.length - 1 ? (
              <button onClick={() => setSection(s => s + 1)}
                style={{ flex: 2, padding: "13px", border: "none", borderRadius: 10, background: ACCENT, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14 }}>
                Next: {SECTIONS[section + 1].title} →
              </button>
            ) : (
              <button onClick={generateSummary}
                style={{ flex: 2, padding: "13px", border: "none", borderRadius: 10, background: ACCENT2, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14 }}>
                ✨ Generate Clinical Summary
              </button>
            )}
          </div>
        </div>
      )}

      {/* LOADING */}
      {screen === "loading" && (
        <div style={{ maxWidth: 500, margin: "100px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 20, animation: "pulse 1.5s ease-in-out infinite", display: "inline-block" }}>⚕️</div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", color: ACCENT2, fontSize: 22, marginBottom: 10 }}>Generating Clinical Summary…</h2>
          <p style={{ color: MUTED, fontSize: 14 }}>Analysing patient data and preparing consultation notes.</p>
          <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.7} }`}</style>
        </div>
      )}

      {/* SUMMARY */}
      {screen === "summary" && (
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "24px 20px 60px" }}>
          <div style={{ background: ACCENT2, color: "#fff", borderRadius: 14, padding: "20px 24px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, marginBottom: 2 }}>Clinical Consultation Summary</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{name || "Patient"} · BMI {bmiVal || "N/A"} · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={{ background: copied ? "#4caf7d" : "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
              <button onClick={() => { setScreen("form"); setSection(0); }} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                ← Edit
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { label: "BMI", value: bmiVal ? `${bmiVal} kg/m²` : "N/A" },
              { label: "BP", value: data.bp_sys ? `${data.bp_sys}/${data.bp_dia}` : "N/A" },
              { label: "HbA1c", value: data.hba1c || "N/A" },
              { label: "To Lose", value: data.weight && data.goalWeight ? `${(parseFloat(data.weight) - parseFloat(data.goalWeight)).toFixed(1)} kg` : "N/A" },
              { label: "Approach", value: data.approach || "N/A" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 8, padding: "7px 13px", fontSize: 12 }}>
                <span style={{ color: MUTED }}>{s.label}: </span>
                <strong style={{ color: TEXT }}>{s.value}</strong>
              </div>
            ))}
          </div>

          {error ? (
            <div style={{ background: "#fff0f0", border: "1.5px solid #f5c6c6", borderRadius: 12, padding: "20px 24px", color: "#c0392b", fontSize: 14 }}>
              ⚠️ Error: {error}
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.05)", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>⚕️ AI-Generated Clinical Summary</div>
              {renderMarkdown(summary)}
            </div>
          )}

          <div style={{ background: "#fffbeb", border: "1.5px solid #f0d98a", borderRadius: 10, padding: "14px 18px" }}>
            <p style={{ fontSize: 12, color: "#8a7030", lineHeight: 1.6 }}>
              <strong>Clinical Disclaimer:</strong> This AI-generated summary is a decision-support tool only. It does not replace clinical judgement. All recommendations must be reviewed by a qualified clinician before implementation.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
