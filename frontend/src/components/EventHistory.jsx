import { useEffect, useState } from "react";
import { api } from "../api.js";
import Notice from "./Notice.jsx";

const PAGE_SIZE = 10;
const LABELS = { CREATED: "Đăng ký", CANCELLED: "Hủy đăng ký" };

export default function EventHistory({ studentId, refresh }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          student_id: studentId,
          limit: String(PAGE_SIZE),
          offset: String(page * PAGE_SIZE),
        });
        const result = await api(`/enrollment-events?${params}`, {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        setData(result);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message);
        setData({ items: [], total: 0 });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [studentId, page, refresh]);

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <section className="panel">
      <h2>4. Lịch sử đăng ký</h2>
      <p className="muted">
        Sinh viên {studentId} · {data.total} sự kiện (dữ liệu demo)
      </p>

      {loading && <Notice>Đang tải lịch sử...</Notice>}
      <Notice kind="error">{error}</Notice>

      {!loading && !error && data.items.length === 0 && (
        <p>Sinh viên chưa có sự kiện đăng ký nào.</p>
      )}

      {!error && data.items.length > 0 && (
        <div className="table-scroll">
          <table aria-label="Lịch sử đăng ký">
            <thead>
              <tr><th>Thời điểm</th><th>Lớp</th><th>Sự kiện</th></tr>
            </thead>
            <tbody>
              {data.items.map((ev) => (
                <tr key={ev.id}>
                  <td>{new Date(ev.occurred_at).toLocaleString("vi-VN")}</td>
                  <td>{ev.class_section_id}</td>
                  <td>{LABELS[ev.event_type] ?? ev.event_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pager">
        <button type="button" className="secondary"
          disabled={loading || page === 0}
          onClick={() => setPage((p) => p - 1)}>Trang trước</button>
        <span>Trang {page + 1} / {totalPages}</span>
        <button type="button" className="secondary"
          disabled={loading || page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}>Trang sau</button>
      </div>
    </section>
  );
}
