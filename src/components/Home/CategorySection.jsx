const CategorySection = ({categories, loadingProducts}) => {
    return(
        <section id="categories" className="bg-amazon-surface w-full">
        <div className="bg-amazon-bg/30 w-full flex justify-center text-center pb-10 px-6 lg:px-8">
          <div className="w-full">
            <p className="font-bold text-3xl mt-18 mb-2">Shop by Category</p>
            <p className="text-amazon-textLight mb-15">Browse our wide range of categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-7 w-full">
              {loadingProducts ?
                (
                  //Categories Skeleton
                  Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="p-5 w-[220px] lg:w-[280px] rounded-2xl bg-amazon-surface border border-amazon-border flex flex-col items-center"
                    >
                      <div className="shimmer mb-6 rounded-lg h-[56px] w-[56px]" />
                      <div className="shimmer h-4 w-20 rounded mb-2" />
                      <div className="shimmer h-3 w-16 rounded" />
                    </div>
                  ))
                ) : (
                  categories.map((category, index) => (
                    category.count ? 
                      <a key={index} className="hover:shadow-md group p-5 w-full min-w-[200px] rounded-2xl bg-amazon-surface border border-amazon-border hover:border-amazon-orange flex flex-col items-center"
                        href={"/shop?category=" + category.value}>
                        <div className="mb-6 bg-amazon-orange/20 group-hover:bg-amazon-orange/30 rounded-lg p-3">{category.icon}</div>
                        <div className="font-medium">{category.title}</div>
                        <div className="text-xs text-amazon-textLight/60">{category.count} products</div>
                      </a>
                    : null
                  ))
                )
              }
            </div>
          </div>
        </div>
      </section>
    );
}

export default CategorySection;