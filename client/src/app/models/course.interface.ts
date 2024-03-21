// export interface ICourse {
//     id: number,
//     name: string,
//     uuid: string,
//     course_code: string,
//     enrollment_term_id: number,
//     friendly_name?: string,
//     course_color?: string,
//     calendar: {
//         ics: string
//     },

// }
export interface ICourse {
    id: number;
    name: string;
    account_id: number;
    uuid: string;
    start_at: Date | null;
    grading_standard_id: number | null;
    is_public: boolean;
    created_at: Date;
    course_code: string;
    default_view: string;
    root_account_id: number;
    enrollment_term_id: number;
    license: string;
    grade_passback_setting: string | null;
    end_at: Date | null;
    public_syllabus: boolean;
    public_syllabus_to_auth: boolean;
    storage_quota_mb: number;
    is_public_to_auth_users: boolean;
    homeroom_course: boolean;
    course_color: string | null;
    friendly_name: string | null;
    apply_assignment_group_weights: boolean;
    calendar: {
      ics: string;
    };
    time_zone: string;
    blueprint: boolean;
    template: boolean;
    enrollments: IEnrollment[];
    hide_final_grades: boolean;
    workflow_state: string;
    restrict_enrollments_to_course_dates: boolean;
  }
  
export interface IEnrollment {
    type: string;
    role: string;
    role_id: number;
    user_id: number;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
  }
  