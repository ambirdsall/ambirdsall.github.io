###
# Page options, layouts, aliases and proxies
###
require 'redcarpet'

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
page '/', layout: false
page 'blog-posts/*', layout: false
page 'blag/index.html', layout: :blag_index_layout
page 'blag/posts/*', layout: :post_layout

# Prevent building layouts as if they're templates
# (Presumably this is a middleman 4 bug, but tooooo lazy to properly isolate)
ignore '**/layout.*'
ignore '**/layouts/*'

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

activate :syntax, :line_numbers => true

activate :directory_indexes

activate :external_pipeline,
  name: :rollup,
  command: "rollup -c#{build? ? '' : 'w'}",
  source: ''

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch = :master
  deploy.build_before = true
end

# configure :development do
#   activate :livereload
# end

activate :blog do |blog|
  blog.prefix = 'blag'
  blog.permalink = "{title}.html"
  # Matcher for blog source files
  blog.sources = "posts/{year}-{month}-{day}_{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = :post_layout
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md.erb"

  blog.new_article_template = File.expand_path('source/blag/new_article_template.html.md.erb', File.dirname(__FILE__))
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def titleize(string)
    string.downcase.gsub(' ', '-').gsub(/[^a-z\d-]/, '')
  end

  def section(title)
    <<~EOMD
      <h3 id="#{titleize title}">
        #{title}
        <a class="section__title" href="##{titleize title}">§</a>
      </h2>
    EOMD
  end

  def strip_frontmatter(string)
    lines = string.split("\n")
    if lines.first =~ /<hr>/
      next_line = lines.shift until next_line =~ /<\/p>/
    end

    lines.join("\n")
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css
end
