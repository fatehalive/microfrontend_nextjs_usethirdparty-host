import Button from '@/components/Button'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h2>localhost:3000</h2>
      <h1>HOST: DASHBOARD SUPER APP or CONTAINER</h1>
      <div>
        <p>consume from remote</p>
        <Button/>
      </div>
    </main>
  )
}
