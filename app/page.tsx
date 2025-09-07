import ChecklistFormV2 from '@/components/checklist-form-v2'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <ChecklistFormV2 />
      </div>
    </div>
  )
}