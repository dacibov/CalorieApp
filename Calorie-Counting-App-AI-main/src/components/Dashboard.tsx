// src/components/Dashboard.tsx
export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fee2e2',
        padding: 32,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Minimal Dashboard</h1>
      <p style={{ fontSize: 16, marginBottom: 8 }}>
        If you can see this, App.tsx ➜ Dashboard.tsx wiring is working.
      </p>
      <p style={{ fontSize: 14 }}>
        This version has <strong>no imports</strong> and doesn&apos;t touch
        Supabase or any other files.
      </p>
    </div>
  );
}
