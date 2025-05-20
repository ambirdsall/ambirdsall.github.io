((markdown-mode
  (eval . (when (and buffer-file-name
                     (string-match "\\.mdx\\'" buffer-file-name))
            (markdown-mode))))
 (nil . ((eval . (add-to-list 'auto-mode-alist '("\\.mdx\\'" . markdown-mode)))))
