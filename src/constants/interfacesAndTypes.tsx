export interface CustomButtonType {
    title: string
    handleEventClick: () => void
};

interface Major {
    anio_inicio: number;
    id: number;
    name: string;
    officialPage: string;
}

export interface FileRow {
    /* id: number; */
    name: string;
    subject: string;
    majors: Major[];
    quarter: number;
    type: string;
    /* uploadDate: string; */
    url: string;
    month: string;
}