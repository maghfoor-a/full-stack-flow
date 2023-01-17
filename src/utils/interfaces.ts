export interface IResource {
  resource_id: number;
  resource_post_date: Date;
  resource_name: string;
  author_name: string;
  user_id: number;
  resource_description: string;
  resource_tags: string;
  resource_content_type: string;
  resource_user_recomendation: string;
  resource_recomendation_reason: string;
  resource_likes: number;
  resource_link: string;
}
