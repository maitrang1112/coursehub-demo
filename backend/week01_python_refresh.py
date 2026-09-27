students = [
    {"id": "22000001", "name": "Nguyen Minh Anh", "major": "KHDL"},
    {"id": "22000002", "name": "Tran Duc Long", "major": "KHDL"},
]
courses = [
    {
    "code": "INT2204",
    "name": "Co so du lieu Web va he thong thong tin",
    "capacity": 3,
    "enrolled": 2,
    },
    {
    "code": "INT2205",
    "name": "Khai pha du lieu",
    "capacity": 2,
    "enrolled": 2,
    },
]
enrollments = [
    {"student_id": "22000001", "course_code": "INT2204"}
]

def normalize(string):
    return string.strip().lower()

def student_exist(student_id):
    for student in students:
        if normalize(student_id) == normalize(student["id"]):
            return True
    return False

def course_exist(course_code):
    for course in courses:
        if normalize(course_code) == normalize(course["code"]):
            return True
    return False

def course_available(course_code):
    if course_exist(course_code):
        for course in courses:
            if normalize(course_code) == normalize(course["code"]):
                remaining = course["capacity"] - course["enrolled"]
                if remaining <= 0:
                    return False
    return True

def duplicate(student_id, course_code):
    for enrollment in enrollments:
        if normalize(student_id) == normalize(enrollment["student_id"]) and normalize(course_code) == normalize(enrollment["course_code"]):
            return True
    return False


def enroll_student(student_id, course_code):
    student_id = normalize(student_id)
    course_code = normalize(course_code)
    if not student_exist(student_id):
        return "Sinh vien khong ton tai"
    elif not course_exist(course_code):
        return "Hoc phan khong ton tai"
    elif duplicate(student_id, course_code):
            return "Ban da dang ky hoc phan nay"
    elif not course_available(course_code):
        return "Hoc phan da du so luong cho phep sinh vien dang ky"
    new_enrollment = {
        "student_id" : student_id,
        "course_code" : course_code.upper()
    }
    enrollments.append(new_enrollment)
    for course in courses:
        if course_code == normalize(course["code"]):
            course["enrolled"] = course["enrolled"] + 1
    return "Ban da dang ky hoc phan thanh cong"

print(enroll_student("22000002", "INT2204")) # Ket qua: Ban da dang ky hoc phan thanh cong
print(enroll_student("22000001", "INT2204")) # Ket qua: Ban da dang ky hoc phan nay
print(enroll_student("22000001", "INT2205")) # Ket qua: Hoc phan da du so luong cho phep sinh vien dang ky
print(enroll_student("22000001", "INT2206")) # Ket qua: Hoc phan khong ton tai
print(enroll_student("22000003", "INT2204")) # Ket qua: Sinh vien khong ton tai

    


        