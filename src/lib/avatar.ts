import { Bird, Cat, Dog, Fish, Flower2, Moon, Rabbit, Rocket, Star, Sun, TreePine, Turtle } from 'lucide-react';
import type { AvatarId } from '../store/types';

export const DAFTAR_AVATAR: { id: AvatarId; Ikon: typeof Cat; latar: string }[] = [
  { id: 'Cat', Ikon: Cat, latar: 'bg-jeruk-100' },
  { id: 'Dog', Ikon: Dog, latar: 'bg-krem-200' },
  { id: 'Rabbit', Ikon: Rabbit, latar: 'bg-pai-100' },
  { id: 'Bird', Ikon: Bird, latar: 'bg-ing-100' },
  { id: 'Fish', Ikon: Fish, latar: 'bg-ing-100' },
  { id: 'Turtle', Ikon: Turtle, latar: 'bg-pai-100' },
  { id: 'Rocket', Ikon: Rocket, latar: 'bg-krem-200' },
  { id: 'Star', Ikon: Star, latar: 'bg-jeruk-100' },
  { id: 'Sun', Ikon: Sun, latar: 'bg-jeruk-100' },
  { id: 'Moon', Ikon: Moon, latar: 'bg-ing-100' },
  { id: 'Flower2', Ikon: Flower2, latar: 'bg-pai-100' },
  { id: 'TreePine', Ikon: TreePine, latar: 'bg-pai-100' },
];

export function avatarDari(id: AvatarId) {
  return DAFTAR_AVATAR.find((a) => a.id === id) ?? DAFTAR_AVATAR[0];
}
