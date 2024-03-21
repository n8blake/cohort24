import { ICourse } from "./course.interface";

export interface IAssignment {
    id: number;
    description: string;
    due_at: Date | null;
    unlock_at: Date | null;
    lock_at: Date | null;
    points_possible: number | null;
    grading_type: string;
    assignment_group_id: number;
    grading_standard_id: number | null;
    created_at: Date;
    updated_at: Date;
    peer_reviews: boolean;
    automatic_peer_reviews: boolean;
    position: number;
    grade_group_students_individally: boolean;
    anonymous_peer_reviews: boolean;
    group_category_id: number | null;
    post_to_sis: boolean;
    moderated_grading: boolean;
    omit_from_final_grade: boolean;
    intra_group_peer_reviews: boolean;
    anonymous_instructor_annotations: boolean;
    anonymous_grading: boolean;
    graders_anonymous_to_graders: boolean;
    grader_count: number;
    grader_comments_visible_to_graders: boolean;
    final_grader_id: number | null;
    grader_names_visible_to_final_grader: boolean;
    allowed_attempts: number;
    annotatable_attachment_id: number | null;
    hide_in_gradebook: boolean;
    lock_info: ILockInfo;
    secure_params: string;
    lti_context_id: string;
    course_id: number;
    course?: ICourse;
    name: string;
    submission_types: string[];
    has_submitted_submissions: boolean;
    due_date_required: boolean;
    max_name_length: number;
    in_closed_grading_period: boolean;
    graded_submissions_exist: boolean;
    is_quiz_assignment: boolean;
    can_duplicate: boolean;
    original_course_id: number | null;
    original_assignment_id: number | null;
    original_lti_resource_link_id: number | null;
    original_assignment_name: string | null;
    original_quiz_id: number | null;
    workflow_state: string;
    important_dates: boolean;
    muted: boolean;
    html_url: string;
    quiz_id: number;
    anonymous_submissions: boolean;
    rubric: RubricCriteria[];
    rubric_settings: RubricSettings;
    published: boolean;
    only_visible_to_overrides: boolean;
    locked_for_user: boolean;
    lock_explanation: string;
    submissions_download_url: string;
    post_manually: boolean;
    anonymize_students: boolean;
    require_lockdown_browser: boolean;
    restrict_quantitative_data: boolean;
  }
  
  interface RubricCriteria {
    id: string;
    points: number;
    description: string;
    long_description: string;
    ignore_for_scoring: boolean | null;
    criterion_use_range: boolean;
    ratings: RubricRating[];
    outcome_id?: number;
    vendor_guid?: string | null;
  }
  
  interface RubricRating {
    id: string;
    points: number;
    description: string;
    long_description: string;
    outcome_id?: number;
  }
  
  interface RubricSettings {
    id: number;
    title: string;
    points_possible: number;
    free_form_criterion_comments: boolean;
    hide_score_total: boolean;
    hide_points: boolean;
  }


export interface ILockInfo {
    lock_at: string;
    can_view: boolean;
    asset_string: string;
}
  