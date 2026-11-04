import ThemeToggle from './components/layout/ThemeToggle';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import Stars from './components/ui/Stars';
import Badge from './components/ui/Badge';
import ProgressBar from './components/ui/ProgressBar';

export default function App() {
  return (
    <main className="mx-auto max-w-md p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Siap Kelas 3</h1>
        <ThemeToggle />
      </div>
      <Card className="mt-4">
        <Badge>Contoh</Badge>
        <div className="mt-2 flex items-center gap-2">
          <Stars jumlah={2} />
        </div>
        <div className="mt-2">
          <ProgressBar persen={40} label="Contoh progres" />
        </div>
        <div className="mt-4">
          <Button>Mulai</Button>
        </div>
      </Card>
    </main>
  );
}
