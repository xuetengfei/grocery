.PHONY: list newjs mergejs

jslist = *.js
TIME = $$(date '+%Y-%m-%d %H:%M:%S')
TIMESTRING = $$(date '+%Y-%m-%d-%H-%M-%S')

list:
	    @for i in $(jslist); do \
    	    echo $$i; \
	    done

newjs:
		echo "//" $(TIMESTRING) >> $$PWD/$(TIMESTRING).js
mergejs:
		mkdir -p bakFile;
		echo "//" $$(date '+%Y-%m-%d %H:%M:%S') >> bakFile/merged.js; 
		cat *.js >> bakFile/merged.js;
		rm *.js