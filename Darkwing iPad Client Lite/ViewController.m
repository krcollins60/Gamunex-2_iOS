//
//  ViewController.m
//  Darkwing iPad Client Lite
//
//  Created by Zalewski, Lukasz (PPY-MTL) on 10/4/12.
//  Copyright (c) 2012 Zalewski, Lukasz (PPY-MTL). All rights reserved.
//

#import "ViewController.h"
#import "RootView.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize rootView;

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    rootView = [[RootView alloc] initWithFrame:CGRectMake(0, 0, 1024, 768)];
    [rootView setViewController:self];
    [rootView initAssets];
    
    [self setView:rootView];
}

- (void)viewDidAppear:(BOOL)animated {
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    
    if (interfaceOrientation==UIInterfaceOrientationIsLandscape(interfaceOrientation))
        return YES;
    
    return NO;
}

@end
