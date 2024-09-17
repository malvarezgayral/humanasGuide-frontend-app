import { subjectsForGeography, subjectsForHistory, subjectsForInternationalRelationships } from "@/constants/mockedData";

export const getSubjects = (major: string) => {
    let data;
    switch (major) {
        case 'historia':
            data = subjectsForHistory;
            break;
        case 'rel_int':
            data = subjectsForInternationalRelationships
            break;
        case 'geografia':
            data = subjectsForGeography
            break;

        default:
            break;
    }

    return data as [];
}