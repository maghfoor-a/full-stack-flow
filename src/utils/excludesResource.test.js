import { excludesResource } from "./excludesResource";

const testArray = [
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  },
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  },
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  },
];

const failTestArray = [
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  },
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  },
  {
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "www.neill.com",
  },
];

test("testing the excludes function", () => {
  expect(excludesResource(testArray, "www.neill.com")).toBe(true);
  expect(excludesResource(failTestArray, "www.neill.com")).toBe(false);
});
