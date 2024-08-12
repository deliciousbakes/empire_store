import { getAllCategories } from "@/actions/CategoryAction";
import DataTable from "@/components/DataTableComponents/DataTable";
import PageHeader from "@/components/FormInputs/PageHeader";
import { TableHeader } from "@/components/ui/table";
import { Category } from "@prisma/client";
import { columns } from "./columns";
 
export default async function page() {
  const categories: Category[] = (await getAllCategories()) || [];
  return (
    <div className="p-8">
      <TableHeader />
      <PageHeader
        btnTitle={"Add Category"}
        title={"Categories"}
        href={"/dashboard/categories/new"}
      />
      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}