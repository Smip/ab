export class Comment {
  constructor(
    public author: any,
    public content: string,
    public ID?: number,
    public post?: any,
    public date?: string,
    public URL?: string,
    public short_URL?: string,
    public raw_content?: string,
    public status?: string,
    public parent?: any,
    public type?: string,
    public like_count?: number,
    public i_like?: boolean,
    public meta?: any,
    public can_moderate?: boolean,
  ) {
  }
}
