//
//  CartViewController.swift
//  MyStore
//
//  Created by Amit Kulkarni on 20/01/24.
//

import UIKit
import Alamofire

class CartViewController: BaseViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var labelTotal: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    var cartItems: [CartItem] = []
    var selectedProductIndex = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // add refresh button on right side
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .refresh, target: self, action: #selector(loadCartItems))
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
    }
    
    override func viewDidAppear(_ animated: Bool) {
        loadCartItems()
    }
    
    @objc func loadCartItems() {
        let url = createUrl(path: "/cart/")
        let token = UserDefaults.standard.value(forKey: "TOKEN") as! String
        let headers: HTTPHeaders = [
            "token": token
        ]
        
        let request = AF.request(url, method: .get, headers: headers)
        request.response(completionHandler: { response in
            switch response.result {
            case let .success(value):
                if let data = value {
                    let result = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
                    if result["status"] as! String == "success" {
                        let tmpCartItems = result["data"] as! [[String: Any]]
                        
                        var total = 0
                        self.cartItems.removeAll()
                        for tempItem in tmpCartItems {
                            let item = CartItem()
                            item.id = tempItem["id"] as! Int
                            item.title = tempItem["title"] as! String
                            item.mrp = tempItem["mrp"] as! Int
                            item.quantity = tempItem["quantity"] as! Int
                            item.category = tempItem["category"] as! String
                            item.company = tempItem["company"] as! String
                            item.price = tempItem["price"] as! Int
                            item.total = tempItem["price"] as! Int
                            item.image = tempItem["image"] as! String
                            
                            total += item.total
                            self.cartItems.append(item)
                        }
                        self.tableView.reloadData()
                        self.labelTotal.text = "Total: Rs. \(total)"
                    } else {
                        self.showError(message: result["error"] as! String)
                    }
                }
            case let .failure(error):
                print(error)
            }
        })
    }
    
//    func updateCart(cartItem: CartItem) {
//        let url = createUrl(path: "/cart/")
//        let price = product.mrp - ((product.mrp * product.discount)/100)
//        let body = [
//            "productId": product.id,
//            "mrp": product.mrp,
//            "price": price,
//            "quantity": 1,
//            "total": price
//        ]
//        let token = UserDefaults.standard.value(forKey: "TOKEN") as! String
//        let headers: HTTPHeaders = [
//            "token": token
//        ]
//        let request = AF.request(url, method: .post, parameters: body, headers: headers)
//        request.response(completionHandler: {response in
//            switch response.result {
//            case let .success(data):
//                if let data = data {
//                    let result = try! JSONSerialization.jsonObject(with: data) as! [String: Any]
//                    if result["status"] as! String == "success" {
//                        self.showSuccess(message: "added the product to your cart")
//                    } else {
//                        self.showError(message: result["error"] as! String)
//                    }
//                }
//            case let .failure(error):
//                print(error)
//            }
//        })
//    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cartItems.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")!
        
        let imageView = cell.viewWithTag(100) as! UIImageView
        let labelTitle = cell.viewWithTag(101) as! UILabel
        let labelCategory = cell.viewWithTag(102) as! UILabel
        let labelPrice = cell.viewWithTag(103) as! UILabel
        let stpper = cell.viewWithTag(104) as! UIStepper
        
        let item = cartItems[indexPath.row]
        labelTitle.text = item.title
        labelCategory.text = "\(item.category!), \(item.company!)"
        labelPrice.text = "Price: \(item.price!) x Quantity: \(item.quantity!)"
        
        // load the product image
        loadImage(image: item.image, imageView: imageView)
        
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
}
