import { redirect } from 'next/navigation';

export default function Home() {
  return redirect('/admin/materials/main');
}
