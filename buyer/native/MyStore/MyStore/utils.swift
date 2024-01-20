//
//  utils.swift
//  MyStore
//
//  Created by Amit Kulkarni on 20/01/24.
//

import Foundation
import UIKit
import Alamofire

let SERVER_URL = "http://localhost:3000"

func createUrl(path: String) -> String {
    return "\(SERVER_URL)\(path)"
}

func loadImage(image: String, imageView: UIImageView) {
    let url = createUrl(path: "/" + image)
    let token = UserDefaults.standard.value(forKey: "TOKEN") as! String
    let headers: HTTPHeaders = [
        "token": token
    ]
    
    let request = AF.request(url, method: .get, headers: headers)
    request.response(completionHandler: {response in
        switch response.result {
        case let .success(data):
            if let data = data {
                print(data)
                
                // convert the data to uiimage
                let image = UIImage(data: data)
                
                // set the image to imageview
                imageView.image = image
            }
        case let .failure(error):
            print(error)
        }
    })
}
