export class TaskVO {
    id: number;
    title: string;
    description: string;
    dateCreated: string;
    dateCompleted: string;
    dateScheduled: string;
    dateUpdated: string;
    recurring: boolean;
    priority: number;
    category: number;
    completed: boolean;
    list: ListVO[];
}

export class ListVO {
    id: number;
    title: string;
}