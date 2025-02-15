export type Dragon = {
  id: number;
  name: string;
  type: string;
};

export type DragonFightRequest = {
  dragons: { id: number }[];
};
