//
//  RootView.m
//  Darkwing iPad Client Lite
//
//  Created by Zalewski, Lukasz (PPY-MTL) on 10/4/12.
//  Copyright (c) 2012 Zalewski, Lukasz (PPY-MTL). All rights reserved.
//

#import "RootView.h"
#import "ViewController.h"
//#import "WebView+Debug.h"

@implementation RootView

@synthesize content, modalContent, backBar, viewController;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code
    }
    return self;
}

- (void) initAssets {
    content = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, 1024, 768)];
    content.delegate = self;
    [[content scrollView] setScrollEnabled:NO];
    
    backBar = [[UINavigationBar alloc] initWithFrame:CGRectMake(0, 0, 1024, 45)];
    
    UIBarButtonItem *rightButton = [[UIBarButtonItem alloc] initWithTitle:@"Done" style:UIBarButtonSystemItemDone target:self action:@selector(dismissModalContent)];
    UINavigationItem *item = [[UINavigationItem alloc] initWithTitle:@""];
    item.rightBarButtonItem = rightButton;
    item.hidesBackButton = YES;
    [backBar pushNavigationItem:item animated:NO];
    
    modalContent = [[UIWebView alloc] initWithFrame:CGRectMake(0, 45, 1024, 723)];
    [[modalContent scrollView] setMaximumZoomScale:4.0];
    [[modalContent scrollView] setMinimumZoomScale:1.0];
    [modalContent setScalesPageToFit:YES];
    [self addSubview:content];
    
    [self loadContent];
}

- (void) loadContent {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"payload"];
    
    NSLog(@"%@", [[NSBundle mainBundle] bundlePath]);
    NSLog(@"%@", path);
    
    NSURL *pathURL = [NSURL fileURLWithPath:path];
    NSURLRequest *pathURLRequest = [NSURLRequest requestWithURL:pathURL];
    
    [content loadRequest:pathURLRequest];
}

- (void) loadModalContentWithPath:(NSString *) path{
    NSString *bundlePath = [[NSBundle mainBundle] bundlePath];
    bundlePath = [bundlePath stringByAppendingPathComponent:@"payload"];
    bundlePath = [bundlePath stringByAppendingPathComponent:path];
    
    [self pushModalWithPath:bundlePath];
}

- (void) dismissModalContent {
    [viewController dismissModalViewControllerAnimated:YES];
}

- (BOOL) webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    NSString *urlRequest = [[request URL] absoluteString];
    NSString *serilaizedPrefix = @"serial://";
    
    NSLog(@"Going To: %@", urlRequest);
    
    if ([urlRequest hasPrefix:serilaizedPrefix]) {
        
        NSString *deSerializedString = [urlRequest stringByReplacingOccurrencesOfString:serilaizedPrefix withString:@""];
        
        [self loadModalContentWithPath:deSerializedString];
        
        return FALSE;
    }
    
    
    NSString *dataPrefix = @"serializedData://";
    
    if ([urlRequest hasPrefix:dataPrefix]) {
        
        NSString *encodedString = [urlRequest stringByReplacingOccurrencesOfString:dataPrefix withString:@""];
        
        [self commitNewData:encodedString];
        
        return FALSE;
    }
    
    [self checkSpecialPrefixesWithURL:urlRequest];
    
    return true;
}

- (void) checkSpecialPrefixesWithURL:(NSString *)url {
    NSString *urlCompare = [url lowercaseString];
    if ([urlCompare hasPrefix:@"galmkt://"] || [urlCompare isEqualToString:@"galmkt://"])
    {
        NSLog(@"Found iDash prefix");
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:nil message:[NSString stringWithFormat:@"iDash Button Pressed, target URL:\n%@",url] delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil];
        [alert show];
    }
}

- (void) commitNewData:(NSString *) serialDataString {
    NSLog(@"Data Recieved: %@", serialDataString);
    NSArray *data = [serialDataString componentsSeparatedByString:@"&"];
    NSDictionary *formattedData = [self parseNewDataArray:data];
    NSString *type = [formattedData objectForKey:@"t"];
    NSLog(@"Type: %@", type);
    if ([type isEqualToString:@"request"])
        [self handleRequestedData:formattedData];
}

- (void) handleRequestedData:(NSDictionary *)data {
    NSString *key = [data objectForKey:@"mk"];
    NSString *dataReq = @"null";
    
    NSString *fullEval = [NSString stringWithFormat:@"requestedData('%@','%@');", key, dataReq ];
    NSLog(@"Javasctipt Eval: %@", fullEval);
    
    [content stringByEvaluatingJavaScriptFromString:fullEval];
}
- (NSDictionary *) parseNewDataArray:(NSArray *) newData{
    int i = 1;
    
    NSMutableDictionary *dataDict = [[NSMutableDictionary alloc] init];
    
    while (i < [newData count]) {
        
        [dataDict setValue:[newData objectAtIndex:i+1] forKey:[newData objectAtIndex:i]];
        
        i += 2;
    }
    
    return [NSDictionary dictionaryWithDictionary:dataDict];
}

- (void) pushModalWithPath:(NSString *) path{
    UIView *modalContentContainer = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 1024, 768)];
    
    [modalContentContainer addSubview:backBar];
    [modalContentContainer addSubview:modalContent];
    
    UIViewController *modalController = [[UIViewController alloc] init];
    [modalController setView:modalContentContainer];
    
    NSURL *pathURL = [NSURL fileURLWithPath:path];
    NSURLRequest *pathURLRequest = [NSURLRequest requestWithURL:pathURL];
    [modalContent loadRequest:pathURLRequest];
    
    [viewController presentModalViewController:modalController animated:YES];
}

@end
