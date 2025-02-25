export interface Machine {
  id: number;
  name: string;
  description: string;
  tags: Tags;
  image: string;
  url: string;
}

export interface Tags {
  projectTags: string[];
  cutTypeTags: string[];
  toolTags: string[];
  materialTags: string[];
  specTags: string[];
  // for any later on
  [key: string]: string[];
}
