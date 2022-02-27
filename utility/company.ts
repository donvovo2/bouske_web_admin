import { Company } from "../models/types";
import { supabase } from "./SupabaseClient";

export const addCompany =async (company:Company) => {
  const { data, error } = await supabase
  .from('company')
  .insert([
    { company_id: company.id,
      company_name: company.company_name,
      phone_number: company.phone_number,
    },
  ]);

    if (error) {
    console.log(error.message);
    throw error;
  }else{
     console.log(data);
  }


}

export const getCompanys =async () : Promise<Company[]>=> {
      const { data, error } =await supabase.from('company')
  .select('id, company_name, phone_number');

  if (error) {
    console.log(error.message);
    throw error;
  }
console.log(data)
    return data || [];
}

export const getCompany =async (id: number) : Promise<Company>=> {
    
 const { data, error } =await supabase .from('company')
  .select('id, company_name, phone_number')
  .eq('id',id).single();
  if (error) {
    console.log(error.message);
    throw error;
  }

    return data||[];
}

export const updateCompany = async (company : Company)  => {
      const { data, error } =await supabase
        .from('company').update(
          {
           'company_name': company.company_name,
           'phone_number': company.phone_number,
          }
          ).eq('id', company.id);
  
         if (error) {
    console.log(error.message);
    throw error;
  }
      return data||[];
}

export const removeCompany =async (id: number) : Promise<Company[]>=> {
    
 const { data, error } =await supabase.from('company').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    throw error;
  }

    return data||[];
}
