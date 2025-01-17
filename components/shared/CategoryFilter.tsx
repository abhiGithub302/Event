"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Add className to props to allow styling from the parent component
const CategoryFilter = ({ className = "" }: { className?: string }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      if (categoryList) {
        setCategories(categoryList as ICategory[]);
      }
    }

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)} className={className}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {/* Map over categories only if available */}
        {categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="loading" className="select-item p-regular-14">
            Loading categories...
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
