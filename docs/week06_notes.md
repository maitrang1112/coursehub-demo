# CourseHub - Buoi 6: Docker va CI

## Bai 1: Assertion OpenAPI contract va kiem tra CI
- File test: `backend/tests/test_openapi_contract.py`
- Them assertion kiem tra `GET /sections` co method `get`:
  ```python
  assert "get" in paths["/sections"]
  ```
- Quan sat trang thai do (CI fail):
  - Co tinh doi method sang `"post"`: `assert "post" in paths["/sections"]`
  - Ket qua: `FAILED backend/tests/test_openapi_contract.py::test_enrollment_methods_are_registered` voi loi `AssertionError: assert 'post' in {'get': ...}`.
- Khoi phuc lai trang thai xanh (CI pass):
  - Tra ve dung method `"get"`: `assert "get" in paths["/sections"]`
  - Ket qua: `2 passed in 1.23s`.

## Bai 2: Loi cau hinh co kiem soat
- Chon loi: Sai `VITE_API_BASE_URL` o frontend (`frontend/.env.local`).
- Thao tac gay loi:
  - Doi `VITE_API_BASE_URL=http://127.0.0.1:9999` (sai cong backend).
- Bang chung ghi nhan:
  - Tab Network (DevTools): `GET http://127.0.0.1:9999/courses` -> `(failed) net::ERR_CONNECTION_REFUSED`.
  - Console: Bao loi `ERR_CONNECTION_REFUSED` va thong bao: `"Khong nhan duoc phan hoi API. Kiem tra Backend/CORS..."`.
  - Giao dien nguoi dung: Khong tai duoc danh sach hoc phan/lop hoc, xuat hien thong bao loi.
- Cach sua:
  - Khoi phuc `VITE_API_BASE_URL=http://127.0.0.1:8000` trong `frontend/.env.local`.
  - Khoi dong lai dev server frontend, cac request goi den backend tra ve HTTP `200 OK`.
  - Khong lam thay doi hay xoa du lieu trong database PostgreSQL.
