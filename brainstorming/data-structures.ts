// What do I want to know about the assignment that canvas doesnt give me
// 
// How long will this take?
// How hard is it?
// What do other students have to say about it?
// Volunteer to help others on it


interface assignment {
  title: String;
  description?: String;
  dueDate: Date;
  course: String;
  courseId: number;
}

interface assignmentRating {
  difficulty: number; // int: 0 - 10
  estiatedEfforTime: number; // stored in seconds
  user: ObjectId;
}

interface course {
    name: string,
    description?: string,
    professor: person,
    startDate: Date,
    endDate: Date,
    tas?: [person],
    color: string
}

interface person {
    firstName: String,
    lastName: String,
    role?: string,
    email: String,
    location?: String
}