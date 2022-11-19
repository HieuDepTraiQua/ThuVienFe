import { Component, OnInit } from "@angular/core";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
    isCollapsed = false;
    isDashboard = true;
    parentBreadcum: string = "Book";
    childBreadcum: string = "";
    accountRole?: string;
    isAdmin = false;

    constructor(
        private router: Router,
        private tokenService: TokenStorageService,
        private toastrService: ToastrService
        ) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                this.isDashboard = (val.url == '/book') ? true : false; 
                if (val && val.url) {
                const trimFirst = val.url.substring(1)
                this.parentBreadcum = trimFirst[0].toUpperCase() + trimFirst.substr(1).toLowerCase();   
                }
                
            }
            });
    }

    ngOnInit() {
        this.checkRole();
    }


    navigateLink(router: string): void {
        this.router.navigateByUrl(router);
    }

    isSelected(route: string): boolean {
        return route === this.router.url;
    }

    signOut(): void {
        this.tokenService.signOut();
        this.toastrService.success("Đăng xuất thành công")
    }

    checkRole (): void {
        this.accountRole = this.tokenService.getUser();
        if (this.accountRole === "admin"){
            this.isAdmin = true;            
        }
    }
}