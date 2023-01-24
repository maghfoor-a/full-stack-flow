export interface IResource {
  resource_id: number;
  resource_post_date: Date;
  resource_name: string;
  author_name: string;
  user_id: number;
  resource_description: string;
  resource_tags: string;
  resource_content_type: string;
  resource_user_recommendation: string;
  resource_recommendation_reason: string;
  resource_likes: number;
  resource_dislikes: number;
  resource_link: string;
}

export interface ResourcesListProps {
  resources: IResource[];
}

export interface FullResourcesPageProps {
  selectedResource: IResource | undefined;
}

export interface IComments {
  comment_id: number;
  user_id: number;
  resource_id: number;
  comment_text: string;
  comment_likes: number;
  comment_time: number;
}

export type ResourceFormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type UseFetchResourcesType = {
  resources: IResource[];
  updateResources: () => void;
};
