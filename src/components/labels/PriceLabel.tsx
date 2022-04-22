import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { commonMessages } from '../../helpers/translation'
import { useCurrency } from '../../hooks/util'
import { PeriodType } from '../../types/data'
import ShortenPeriodTypeLabel from './ShortenPeriodTypeLabel'

const FullDetailPrice = styled.div`
  > div:first-child {
    color: var(--gray-darker);
    font-size: 28px;
    font-weight: bold;
  }
  > div:nth-child(2) {
    color: var(--gray-darker);
  }
`
const SalePrice = styled.div``
const ListPrice = styled.div`
  ${SalePrice} + && {
    color: var(--black-45);
    font-size: 14px;
    text-decoration: line-through;
  }
`

const InlinePrice = styled.div`
  color: ${props => props.theme['@primary-color']};

  & > span:first-child:not(:last-child) {
    margin-right: 0.5rem;
    color: ${props => 'var(--gray-dark);'};
    text-decoration: line-through;
  }
`

type PriceLabelOptions = {
  listPrice: number
  salePrice?: number | null
  downPrice?: number | null
  periodAmount?: number | null
  periodType?: PeriodType
  currencyId?: 'LSC' | string
  coinUnit?: string
  saleAmount?: number | null
}
const PriceLabel: React.VFC<
  PriceLabelOptions & {
    variant?: 'default' | 'inline' | 'full-detail'
    render?: React.VFC<PriceLabelOptions & { formatCurrency: (price: number) => string }>
    noFreeText?: boolean
  }
> = ({ variant, render, noFreeText, ...options }) => {
  const { listPrice, salePrice, downPrice, currencyId, coinUnit, periodAmount, periodType } = options
  const { formatMessage } = useIntl()
  const { formatCurrency } = useCurrency(currencyId, coinUnit)

  const displayPrice = salePrice || listPrice
  const firstPeriodPrice = displayPrice - (downPrice || 0)

  if (render) {
    return render({ ...options, formatCurrency })
  }

  const periodElem = !!periodType && (
    <>
      {` / ${periodAmount && periodAmount > 1 ? periodAmount : ''}`}
      <ShortenPeriodTypeLabel periodType={periodType} withQuantifier={!!periodAmount && periodAmount > 1} />
    </>
  )

  if (variant === 'full-detail') {
    return (
      <FullDetailPrice className="price">
        {!!downPrice && (
          <div className="downPrice">
            <span className="downPrice__firstPeriod">{formatMessage(commonMessages.label.firstPeriod)}</span>
            {firstPeriodPrice === 0 && !noFreeText && (
              <span className="downPrice__free">{formatMessage(commonMessages.label.free)}</span>
            )}
            <span className="downPrice__firstPeriodPriceAmount">{formatCurrency(firstPeriodPrice)}</span>
          </div>
        )}

        {typeof salePrice === 'number' && (
          <SalePrice className="salePrice">
            {!!downPrice && (
              <span className="salePrice__fromSecondPeriod">
                {formatMessage(commonMessages.label.fromSecondPeriod)}
              </span>
            )}
            {salePrice === 0 && !noFreeText && (
              <span className="salePrice__freeText">{formatMessage(commonMessages.label.free)}</span>
            )}
            <span className="salePrice__amount">{formatCurrency(salePrice)}</span>
            <span className="salePrice__periodUnit" style={{ fontSize: '16px' }}>
              {periodElem}
            </span>
          </SalePrice>
        )}

        <ListPrice className="listPrice">
          {typeof salePrice === 'number' ? (
            <span className="listPrice__originalPriceText">{formatMessage(commonMessages.label.originalPrice)}</span>
          ) : !!downPrice ? (
            <span className="listPrice__fromSecondPeriodText">
              {formatMessage(commonMessages.label.fromSecondPeriod)}
            </span>
          ) : (
            ''
          )}
          {listPrice === 0 && !noFreeText && (
            <span className="listPrice__freeText">{formatMessage(commonMessages.label.free)}</span>
          )}
          <span className="listPrice__amount">{formatCurrency(listPrice)}</span>
          <span className="listPrice__periodUnit" style={{ fontSize: '16px' }}>
            {periodElem}
          </span>
        </ListPrice>
      </FullDetailPrice>
    )
  }

  if (variant === 'inline') {
    return (
      <InlinePrice className="price">
        <span className="listPrice__amount">{formatCurrency(listPrice)}</span>
        <span className="listPrice__periodUnit">{periodElem}</span>
        {typeof salePrice === 'number' && (
          <>
            <span className="salePrice__amount">{formatCurrency(salePrice)}</span>
            <span className="salePrice__periodUnit">{periodElem}</span>
          </>
        )}
      </InlinePrice>
    )
  }

  return <span className="price listPrice__amount">{formatCurrency(listPrice)}</span>
}

export default PriceLabel
