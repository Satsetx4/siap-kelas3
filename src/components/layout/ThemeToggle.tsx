import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import IconButton from '../ui/IconButton';

function bacaTema(): boolean {
  try {
    return localStorage.getItem('sk3:tema') === 'gelap';
  } catch {
    return false;
  }
}

function tulisTema(gelap: boolean) {
  try {
    localStorage.setItem('sk3:tema', gelap ? 'gelap' : 'terang');
  } catch { /* abaikan */ }
  document.documentElement.classList.toggle('dark', gelap);
  try {
    document.documentElement.style.colorScheme = gelap ? 'dark' : 'light';
  } catch { /* abaikan */ }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', gelap ? '#14110F' : '#FFFBF5');
}

export default function ThemeToggle() {
  const [gelap, setGelap] = useState(false);

  useEffect(() => {
    setGelap(document.documentElement.classList.contains('dark') || bacaTema());
  }, []);

  const ganti = () => {
    const lanjut = !gelap;
    setGelap(lanjut);
    tulisTema(lanjut);
  };

  return (
    <IconButton aria-label={gelap ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'} onClick={ganti}>
      <motion.span
        key={gelap ? 'bulan' : 'matahari'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="inline-flex"
      >
        {gelap ? <Sun size={24} /> : <Moon size={24} />}
      </motion.span>
    </IconButton>
  );
}
