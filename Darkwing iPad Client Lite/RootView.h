//
//  RootView.h
//  Darkwing iPad Client Lite
//
//  Created by Zalewski, Lukasz (PPY-MTL) on 10/4/12.
//  Copyright (c) 2012 Zalewski, Lukasz (PPY-MTL). All rights reserved.
//

#import <UIKit/UIKit.h>
@class ViewController;

@interface RootView : UIView <UIWebViewDelegate>

- (void) initAssets;

@property (nonatomic, strong) UIWebView *content, *modalContent;
@property (nonatomic, strong) UINavigationBar *backBar;
@property (nonatomic, strong) ViewController *viewController;

@end
