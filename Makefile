build-dir =			Build/

html-replace =		$(build-dir)index.php
html-prereq =		index.php \
					company.php \
					portfolio.php \
					project.php \
					favicon.ico \

dir-prereq =		images \
					include \
					php \
					css \
					js \

clean:
	@rm -rf $(build-dir)
	@rm -rf $(zip-directory)
	
install: copy-dir php copy-html
	@echo "Installation is complete."

copy-dir: ; $(foreach dir,$(dir-prereq),rsync -rupE --delete --exclude=".svn*" $(dir) $(build-dir) && ) :
copy-html: 
	@rm -f $(html-replace)
	$(foreach html,$(html-prereq),cp $(html) $(build-dir)$(html) && ) :
	php php/load_projects.php
	php php/make_images.php
	cp portfolio.sqlite $(build-dir)portfolio.sqlite
	cp -r media $(build-dir)