import { sum } from 'ramda'
import { useApp } from '../contexts/AppContext'
import { notEmpty } from '../helpers'
import { Resource, ResourceType } from './resource'

const convertProductType: (originalType: ResourceType, toMetaProduct: boolean) => ResourceType = (
  originalType: ResourceType,
  toMetaProduct: boolean = true,
) => {
  switch (originalType) {
    case 'program_plan':
      return toMetaProduct ? ('program' as ResourceType) : originalType
    case 'program_package_plan':
      return toMetaProduct ? ('program_package' as ResourceType) : originalType
    case 'activity_ticket':
      return toMetaProduct ? ('activity' as ResourceType) : originalType
    case 'merchandise_spec':
      return toMetaProduct ? ('merchandise' as ResourceType) : originalType
    default:
      return originalType
  }
}

export const useTracking = (trackingOptions = { separator: '|' }) => {
  const { settings, currencyId: appCurrencyId, id: appId } = useApp()
  const brand = settings['name'] || document.title
  const enabledCW = Boolean(Number(settings['tracking.cw.enabled']))
  return {
    view: () => {},
    impress: (
      resources: (Resource | null)[],
      options?: {
        collection?: string
      },
    ) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      const impressions = resources
        .map((resource, idx) =>
          resource
            ? {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
                quantity: 1, // TODO: use the inventory
                list: options?.collection || window.location.pathname,
                position: idx + 1,
              }
            : null,
        )
        .filter(notEmpty)
      if (impressions.length > 0) {
        ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
        ;(window as any).dataLayer.push({
          event: 'productImpression',
          label: impressions.map(impression => impression.list).join('|'),
          value: sum(impressions.map(impression => impression.price || 0)),
          ecommerce: {
            currencyCode: appCurrencyId,
            impressions,
          },
        })
      }
    },
    click: (
      resource: Resource,
      options?: {
        collection?: string
        position?: number
      },
    ) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
      ;(window as any).dataLayer.push({
        event: 'productClick',
        label: resource.title,
        value: resource.price,
        ecommerce: {
          currencyCode: appCurrencyId,
          click: {
            actionField: { list: options?.collection || window.location.pathname },
            products: [
              {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
                position: options?.position,
              },
            ],
          },
        },
      })
    },
    detail: (
      resource: Resource,
      options?: {
        collection?: string
      },
    ) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
      ;(window as any).dataLayer.push({
        event: 'detail',
        label: resource.title,
        value: resource.price,
        ecommerce: {
          currencyCode: appCurrencyId,
          detail: {
            actionField: { list: options?.collection || window.location.pathname },
            products: [
              {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand: settings['name'] || document.title,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
              },
            ],
          },
        },
      })

      if (enabledCW) {
        const cwProduct = {
          id: resource.id,
          type: resource.type,
          item: resource?.sku,
          title: resource?.title,
          url: window.location.href,
          price: resource?.price,
          authors: resource.variants?.map(v => ({ name: v })),
          channels: {
            master: {
              id: resource.categories || [],
            },
          },
          keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '',
        }
        ;(window as any).dataLayer.push({
          event: 'cwData',
          itemData: {
            products: [cwProduct],
            program: cwProduct,
            article: cwProduct,
          },
        })
      }
    },
    addToCart: (
      resource: Resource,
      options?: {
        direct?: boolean
        quantity?: number
      },
    ) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
      ;(window as any).dataLayer.push({
        event: options?.direct ? 'addToCartNow' : 'addToCart',
        label: resource.title,
        value: resource.price,
        ecommerce: {
          currencyCode: appCurrencyId,
          add: {
            products: [
              {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
                quantity: 1, // TODO: use the inventory
              },
            ],
          },
        },
      })
    },
    removeFromCart: (
      resource: Resource,
      options?: {
        quantity?: number
      },
    ) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
      ;(window as any).dataLayer.push({
        event: 'removeFromCart',
        label: resource.title,
        value: resource.price,
        ecommerce: {
          currencyCode: appCurrencyId,
          remove: {
            products: [
              {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand: settings['name'] || document.title,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
                quantity: 1, // TODO: use the inventory
              },
            ],
          },
        },
      })
    },
    checkout: (
      resources: Resource[],
      options?: {
        step?: number
      },
    ) => {
      const ecProducts = resources
        .map(resource =>
          resource
            ? {
                id: resource.sku || resource.id,
                name: resource.title,
                price: resource.price,
                brand,
                category: resource.categories?.join(trackingOptions.separator),
                variant: resource.variants?.join(trackingOptions.separator),
                quantity: 1, // TODO: use the cart product
              }
            : null,
        )
        .filter(notEmpty)
      if (ecProducts.length > 0) {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
        ;(window as any).dataLayer.push({
          event: 'checkout',
          label: resources.map(resource => resource.title).join('|'),
          value: sum(resources.map(resource => resource.price || 0)),
          ecommerce: {
            currencyCode: appCurrencyId,
            checkout: {
              actionField: { step: options?.step || 1 },
              products: ecProducts,
            },
          },
        })
      }
      if (enabledCW) {
        const cwProducts = resources
          .map(resource =>
            resource
              ? {
                  id: resource.id,
                  type: resource.type,
                  item: resource?.sku,
                  title: resource?.title,
                  url: window.location.href,
                  price: resource?.price,
                  authors: resource.variants?.map(v => ({ name: v })),
                  channels: {
                    master: {
                      id: resource.categories || [],
                    },
                  },
                  keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '',
                }
              : null,
          )
          .filter(notEmpty)
        if (cwProducts.length > 0) {
          ;(window as any).dataLayer.push({
            event: 'cwData',
            itemData: {
              products: cwProducts,
              program: cwProducts[0],
              article: cwProducts[0],
            },
          })
        }
      }
    },
    addPaymentInfo: (options?: { step?: number; gateway?: string; method?: string }) => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
      ;(window as any).dataLayer.push({
        event: 'checkoutOption',
        label: options?.gateway,
        value: 0,
        ecommerce: {
          currencyCode: appCurrencyId,
          checkout_option: {
            actionField: {
              step: options?.step || 2,
              option: `${options?.gateway || 'unknown'}.${options?.method || 'unknown'}`,
            },
          },
        },
      })
    },
    purchase: (
      orderId: string,
      orderProducts: (Resource & { quantity: number })[],
      orderDiscounts: { name: string; price: number }[],
      options?: {
        step?: number
      },
    ) => {
      const ecProducts =
        orderProducts.map(product => ({
          id: product.sku || product.id,
          name: product.title,
          price: product.price,
          brand,
          category: product.categories?.join(trackingOptions.separator),
          variant: product.variants?.join(trackingOptions.separator),
          quantity: product.quantity,
        })) || []
      if (ecProducts.length > 0) {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
        ;(window as any).dataLayer.push({
          event: 'purchase',
          label: orderProducts.map(orderProduct => orderProduct.title).join('|'),
          value: sum(orderProducts.map(orderProduct => orderProduct.price || 0)),
          ecommerce: {
            currencyCode: appCurrencyId,
            purchase: {
              actionField: {
                id: orderId,
                affiliation: document.title,
                revenue: sum(orderProducts.map(v => v.price || 0)) - sum(orderDiscounts.map(v => v.price)),
                coupon: orderDiscounts.map(v => v.name).join(trackingOptions.separator),
              },
              products: ecProducts,
            },
          },
        })
      }
      if (enabledCW) {
        const cwProducts =
          orderProducts.map(product => {
            const productType = convertProductType(product.type, true)
            return {
              id: product.id,
              order_number: orderId,
              type: productType === 'program_package' ? 'package' : productType,
              item: product?.sku,
              title: product?.title,
              url: window.location.href,
              price: product?.price,
              authors: product.variants?.map(v => ({ name: v })),
              channels: {
                master: {
                  id: product.categories || [],
                },
              },
              keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '',
            }
          }) || []
        if (cwProducts.length > 0) {
          ;(window as any).dataLayer.push({
            event: 'cwData',
            itemData: {
              products: cwProducts,
              program: cwProducts[0],
              article: cwProducts[0],
            },
          })
        }
      }
    },
  }
}
