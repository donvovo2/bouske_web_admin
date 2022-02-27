export interface JobPost{
    id? : number,
    job_title: string,
    company_id: number,
    company_name?: string,
    industry: string,
    job_type: string,
    city: string,
    state?: string,
    country?: string,
    publication_date?: string,
    deadline?: string,
    job_description: string,
}

export interface Company{
    id? : number,
    company_name: string,
    phone_number: string,
}






export interface Company {
    id?:number,
    company_name:string
}

export interface JobType {
    id?:number,
    job_type_name:string
}

export interface Industry {
    id?:number,
    industry_name:string
}