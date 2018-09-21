initFirebase(){
		try {
			// await this.platform.ready();
      //pega da lib
			this.firebase.getToken()
			.then((token) => {
				this.token = token;
				this.firebase.subscribe("file.news").then((result) => {
					this.firebase.onTokenRefresh().subscribe((token) => {
						this.token = token;
					});
					this.firebase.onNotificationOpen().subscribe((notification) => {
						if(notification.dados && notification.dados[0] && notification.dados[0] === "{"){
							notification.dados = JSON.parse(notification.dados);
						}
						let pages, page;
						switch(notification.modulo){
							case 'tipoDado1':
								pages = [{"page": notification.modulo}];
								page = <any>{"page": null};
								
								pages.push(page);
								this.nav.setPages(pages);
								break;
							case 'tipoDado2':
								this.nav.setPages([
									{"page": notification.modulo},
									{"page": "PostDetail", "params": {"post": notification.dados}}
								]);
								break;
						}
					});
				}, (error) => {
				});
			})
			.catch((e) => {
			});
		}catch(e){
		}
	}
}
