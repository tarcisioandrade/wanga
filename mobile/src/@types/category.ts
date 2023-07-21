export interface CategoryBody {
  categories_list: CategoryElement[];
}

export interface CategoryElement {
  id_category: number;
  name: string;
  label: string;
  value: string;
  titles: number;
  view_count: string;
  link: string;
}
