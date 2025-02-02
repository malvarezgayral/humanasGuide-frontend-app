export interface CustomButtonType {
    title: string
    handleEventClick: () => void
};

export interface FileRow {
    id: number;
    name: string;
    subject: string;
    quarter: number;
    type: string;
    uploadDate: string;
    url: string;
    month: string;
}