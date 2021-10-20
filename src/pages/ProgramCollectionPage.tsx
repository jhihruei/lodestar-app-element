import ProgramCard from '../components/cards/ProgramCard'
import ProgramSecondaryCard from '../components/cards/ProgramSecondaryCard'
import ProgramCollection from '../components/collections/ProgramCollection'

const ProgramCollectionPage: React.VFC = () => {
  return (
    <div className="container">
      <ProgramCollection
        element={ProgramCard}
        options={{
          source: 'currentPrice',
          min: 100,
          max: 1000,
          asc: true,
          limit: 3,
          defaultTagNames: ['教學', 'tag_1'],
        }}
      />
      <hr />
      <ProgramCollection
        element={ProgramCard}
        layout={{
          gap: [8, 16],
          gutter: 10,
          columns: [1, 3, 5],
        }}
        options={{
          source: 'publishedAt',
          asc: true,
          defaultCategoryIds: ['286b4906-0550-4c56-a16b-ce88fe516690'],
          withSelector: true,
        }}
      />
      <hr />
      <ProgramCollection
        element={ProgramSecondaryCard}
        layout={{
          gap: 12,
          columns: 2,
        }}
        options={{
          source: 'custom',
          idList: [
            'fa0c97e9-475e-43b6-b7ed-67f8e27ab4c6',
            'c08d6910-893a-419a-9df5-792727541dd1',
            '93c0098f-35db-4c26-ac09-283d48522790',
          ],
        }}
      />
    </div>
  )
}

export default ProgramCollectionPage
