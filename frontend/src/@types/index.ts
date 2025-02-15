export type Dragon = {
  id: number;
  name: string;
  strength: number;
  currentHealth: number;
};

export type DragonFightRequest = {
  dragons: { id: number }[];
};
