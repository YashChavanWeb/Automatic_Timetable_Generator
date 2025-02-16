const college = {
    name: "VCET",
    address: "KT Marg, Vasai (W) - 401202",
    total_classes: 80,
    total_labs: 25,
    total_faculties: 100,
    departments: [
        {
            dept_name: "Computer Engineering",
            HOD: "Dr. Megha Trivedi",
            total_faculties: 15,
            total_no_of_classes: 9,
            total_no_of_labs: 6,
            allocated_classes: [
                {
                    floor: 2,
                    room_no: [215, 216, 218, 219]
                },
                {
                    floor: 3,
                    room_no: [313, 314]
                },
                {
                    floor: 4,
                    room_no: [417, 418]
                }
            ],
            allocated_labs: [
                {
                    floor: 2,
                    lab_no: [1, 2, 3, 4, 5, 6]
                }
            ],
            subjects_details: [
                {
                    sem: "Odd",
                    sem_wise_subjects: [
                        {
                            sem: 1,
                            class_subjects: ["Subject1", "Subject2"],
                            lab_subjects: ["LabSubject1", "LabSubject2"]
                        },
                        {
                            sem: 3,
                            class_subjects: ["Subject3", "Subject4"],
                            lab_subjects: ["LabSubject3", "LabSubject4"]
                        },
                        {
                            sem: 5,
                            class_subjects: ["TCS", "SE", "CG", "DLCOA", "PCE-2"],
                            lab_subjects: ["SE", "CG", "DLCOA", "PCE-2"]
                        },
                        {
                            sem: 7,
                            class_subjects: ["Subject7", "Subject8"],
                            lab_subjects: ["LabSubject7", "LabSubject8"]
                        }
                    ]
                },
                {
                    sem: "Even",
                    sem_wise_subjects: [
                        {
                            sem: 2,
                            class_subjects: ["Subject9", "Subject10"],
                            lab_subjects: ["LabSubject9", "LabSubject10"]
                        },
                        {
                            sem: 4,
                            class_subjects: ["Subject11", "Subject12"],
                            lab_subjects: ["LabSubject11", "LabSubject12"]
                        },
                        {
                            sem: 6,
                            class_subjects: ["Subject13", "Subject14"],
                            lab_subjects: ["LabSubject13", "LabSubject14"]
                        },
                        {
                            sem: 8,
                            class_subjects: ["Subject15", "Subject16"],
                            lab_subjects: ["LabSubject15", "LabSubject16"]
                        }
                    ]
                }
            ],
            sem_details: [
                {
                    sem: "Odd",
                    sem_wise_details: [
                        {
                            sem: 5,
                            no_of_students: 180,
                            no_of_divisions: 3,
                            divisions: [
                                {
                                    division: "1",
                                    no_of_students: 76,
                                    time_per_day: [
                                        { Day: "Monday", timing: "9 to 4", total_hours: 7 },
                                        { Day: "Tuesday", timing: "9 to 4", total_hours: 7 },
                                        { Day: "Wednesday", timing: "9 to 4", total_hours: 7 },
                                        { Day: "Thursday", timing: "9 to 4", total_hours: 7 },
                                        { Day: "Friday", timing: "9 to 4", total_hours: 7 }
                                    ],
                                    no_of_batches: 4,
                                    batches: [
                                        { batch_no: "A", no_of_students: 20 },
                                        { batch_no: "B", no_of_students: 20 },
                                        { batch_no: "C", no_of_students: 20 },
                                        { batch_no: "D", no_of_students: 16 }
                                    ]
                                },
                                {
                                    division: "2",
                                    no_of_students: 30,
                                    time_per_day: [
                                        { Day: "Tuesday", timing: "9 to 4", total_hours: 7 }
                                    ],
                                    no_of_batches: 3,
                                    batches: [
                                        { batch_no: 1, no_of_students: 10 },
                                        { batch_no: 2, no_of_students: 10 },
                                        { batch_no: 3, no_of_students: 10 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    sem: "Even",
                    sem_wise_details: [
                        {
                            sem: 2,
                            no_of_students: 180,
                            no_of_divisions: 3,
                            divisions: []
                        }
                    ]
                }
            ],
            faculties: [
                {
                    faculty_name: "Dr.Dinesh Patil",
                    teaching_subjects: ["OS", "SE"],
                    availability: ["Monday", "Wednesday", "Friday"]
                },
                {
                    faculty_name: "Dr.Priti Rumao",
                    teaching_subjects: ["TCS", "CP"],
                    availability: ["Monday", "Wednesday", "Thursday"]
                },
                {
                    faculty_name: "Dr.Swapna Borde",
                    teaching_subjects: ["DLCOA", "AOA"],
                    availability: ["Tuesday", "Wednesday", "Friday"]
                },
                {
                    faculty_name: "Dr.Sonia Khatu",
                    teaching_subjects: ["MP", "CG"],
                    availability: ["Monday", "Tuesday", "Thursday"]
                },
                {
                    faculty_name: "Dr.Smita Jawale",
                    teaching_subjects: ["DBMS", "ADBMS"],
                    availability: ["Monday", "Thursday", "Friday"]
                }
            ]
        }
    ],
    academic_calendar: {
        start_date: "2024-08-01",
        end_date: "2024-12-31"
    }
};
