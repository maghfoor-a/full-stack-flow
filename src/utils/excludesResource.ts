import { IResource } from "./interfaces";

export function excludesResource(resources: IResource[], link: string) {
  for (const resource of resources) {
    if (resource.resource_link === link) {
      alert("this resource has alredy been posted!");
      return false;
    }
  }
  return true;
}
