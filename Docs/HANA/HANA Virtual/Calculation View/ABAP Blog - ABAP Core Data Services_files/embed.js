var disqus_url=embedVars.disqusUrl,disqus_identifier=embedVars.disqusIdentifier,disqus_container_id="disqus_thread",disqus_shortname=embedVars.disqusShortname,disqus_title=embedVars.disqusTitle,disqus_config_custom=window.disqus_config,disqus_config=function(){var s=embedVars.disqusConfig;this.page.integration=s.integration,this.page.remote_auth_s3=s.remote_auth_s3,this.page.api_key=s.api_key,this.sso=s.sso,this.language=s.language,disqus_config_custom&&disqus_config_custom.call(this)};!function(){var s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src="https://"+disqus_shortname+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(s)}();