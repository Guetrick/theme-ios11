/**
 * Gets variants state.
 * @param {boolean} isFetching -
 * @return {{product_1: {isFetching: *, products: *[]}}}
 */
const variantsByProductId = isFetching => ({
  product_1: {
    isFetching,
    products: [
      {
        id: 'product_2',
        flags: {
          hasVariants: false,
          hasOptions: false,
        },
      },
    ],
  },
});

const mockedStateBase = {
  cart: {
    productPendingCount: 0,
  },
  ui: {
    addToCartBar: {
      added: 0,
    },
  },
};

export const mockedStateSimpleProduct = {
  ...mockedStateBase,
  product: {
    currentProduct: {
      productId: 'product_1',
    },
    productsById: {
      product_1: {
        isFetching: false,
        productData: {
          id: 'product_1',
          name: 'Product No. 1',
          flags: {
            hasVariants: false,
            hasOptions: false,
          },
        },
      },
    },
    optionsByProductId: {
      product_1: null,
    },
  },
};

export const mockedStateSimpleProductNotReady = {
  ...mockedStateSimpleProduct,
  ...{
    product: {
      ...mockedStateSimpleProduct.product,
      productsById: {
        ...mockedStateSimpleProduct.product.productsById,
        ...{
          product_1: {
            isFetching: true,
            productData: {},
          },
        },
      },
    },
  },
};

export const mockedStateVariants = {
  ...mockedStateBase,
  product: {
    currentProduct: {
      productId: 'product_1',
    },
    productsById: {
      product_1: {
        isFetching: false,
        productData: {
          id: 'product_1',
          name: 'Product No. 1',
          flags: {
            hasVariants: true,
            hasOptions: false,
          },
        },
      },
      product_2: {
        isFetching: false,
        productData: {
          id: 'product_2',
          baseProductId: 'product_1',
          name: 'Product No. 2',
          flags: {
            hasVariants: false,
            hasOptions: false,
          },
        },
      },
    },
  },
};

export const mockedStateVariantsReady = {
  ...mockedStateVariants,
  ...{
    product: {
      ...mockedStateVariants.product,
      currentProduct: {
        ...mockedStateVariants.product.currentProduct,
        productVariantId: 'product_2',
      },
      variantsByProductId: variantsByProductId(false),
      optionsByProductId: {
        product_1: null,
        product_2: null,
      },
    },
  },
};

export const mockedStateVariantsNotOrderable = {
  ...mockedStateVariantsReady,
  ...{
    product: {
      ...mockedStateVariantsReady.product,
      variantsByProductId: variantsByProductId(true),
    },
  },
};
