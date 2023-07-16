// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.12.4
// source: Hotel.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// UsersServiceClient is the client API for UsersService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UsersServiceClient interface {
	SignUpUser(ctx context.Context, in *SignUpUserRequest, opts ...grpc.CallOption) (*SignUpUserResponse, error)
	LoginUser(ctx context.Context, in *LoginUserRequest, opts ...grpc.CallOption) (*LoginUserResponse, error)
	AddCredit(ctx context.Context, in *AddCreditRequest, opts ...grpc.CallOption) (*AddCreditResponse, error)
	UnavailableDates(ctx context.Context, in *UnavailableDatesRequest, opts ...grpc.CallOption) (*UnavailableDatesResponse, error)
	Reserve(ctx context.Context, in *ReserveRequest, opts ...grpc.CallOption) (*ReserveResponse, error)
}

type usersServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewUsersServiceClient(cc grpc.ClientConnInterface) UsersServiceClient {
	return &usersServiceClient{cc}
}

func (c *usersServiceClient) SignUpUser(ctx context.Context, in *SignUpUserRequest, opts ...grpc.CallOption) (*SignUpUserResponse, error) {
	out := new(SignUpUserResponse)
	err := c.cc.Invoke(ctx, "/BizServer.UsersService/SignUpUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) LoginUser(ctx context.Context, in *LoginUserRequest, opts ...grpc.CallOption) (*LoginUserResponse, error) {
	out := new(LoginUserResponse)
	err := c.cc.Invoke(ctx, "/BizServer.UsersService/LoginUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) AddCredit(ctx context.Context, in *AddCreditRequest, opts ...grpc.CallOption) (*AddCreditResponse, error) {
	out := new(AddCreditResponse)
	err := c.cc.Invoke(ctx, "/BizServer.UsersService/AddCredit", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) UnavailableDates(ctx context.Context, in *UnavailableDatesRequest, opts ...grpc.CallOption) (*UnavailableDatesResponse, error) {
	out := new(UnavailableDatesResponse)
	err := c.cc.Invoke(ctx, "/BizServer.UsersService/UnavailableDates", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersServiceClient) Reserve(ctx context.Context, in *ReserveRequest, opts ...grpc.CallOption) (*ReserveResponse, error) {
	out := new(ReserveResponse)
	err := c.cc.Invoke(ctx, "/BizServer.UsersService/Reserve", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UsersServiceServer is the server API for UsersService service.
// All implementations must embed UnimplementedUsersServiceServer
// for forward compatibility
type UsersServiceServer interface {
	SignUpUser(context.Context, *SignUpUserRequest) (*SignUpUserResponse, error)
	LoginUser(context.Context, *LoginUserRequest) (*LoginUserResponse, error)
	AddCredit(context.Context, *AddCreditRequest) (*AddCreditResponse, error)
	UnavailableDates(context.Context, *UnavailableDatesRequest) (*UnavailableDatesResponse, error)
	Reserve(context.Context, *ReserveRequest) (*ReserveResponse, error)
	mustEmbedUnimplementedUsersServiceServer()
}

// UnimplementedUsersServiceServer must be embedded to have forward compatible implementations.
type UnimplementedUsersServiceServer struct {
}

func (UnimplementedUsersServiceServer) SignUpUser(context.Context, *SignUpUserRequest) (*SignUpUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignUpUser not implemented")
}
func (UnimplementedUsersServiceServer) LoginUser(context.Context, *LoginUserRequest) (*LoginUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LoginUser not implemented")
}
func (UnimplementedUsersServiceServer) AddCredit(context.Context, *AddCreditRequest) (*AddCreditResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddCredit not implemented")
}
func (UnimplementedUsersServiceServer) UnavailableDates(context.Context, *UnavailableDatesRequest) (*UnavailableDatesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UnavailableDates not implemented")
}
func (UnimplementedUsersServiceServer) Reserve(context.Context, *ReserveRequest) (*ReserveResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Reserve not implemented")
}
func (UnimplementedUsersServiceServer) mustEmbedUnimplementedUsersServiceServer() {}

// UnsafeUsersServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UsersServiceServer will
// result in compilation errors.
type UnsafeUsersServiceServer interface {
	mustEmbedUnimplementedUsersServiceServer()
}

func RegisterUsersServiceServer(s grpc.ServiceRegistrar, srv UsersServiceServer) {
	s.RegisterService(&UsersService_ServiceDesc, srv)
}

func _UsersService_SignUpUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignUpUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).SignUpUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/BizServer.UsersService/SignUpUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).SignUpUser(ctx, req.(*SignUpUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_LoginUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LoginUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).LoginUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/BizServer.UsersService/LoginUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).LoginUser(ctx, req.(*LoginUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_AddCredit_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AddCreditRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).AddCredit(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/BizServer.UsersService/AddCredit",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).AddCredit(ctx, req.(*AddCreditRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_UnavailableDates_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UnavailableDatesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).UnavailableDates(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/BizServer.UsersService/UnavailableDates",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).UnavailableDates(ctx, req.(*UnavailableDatesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _UsersService_Reserve_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ReserveRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServiceServer).Reserve(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/BizServer.UsersService/Reserve",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServiceServer).Reserve(ctx, req.(*ReserveRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// UsersService_ServiceDesc is the grpc.ServiceDesc for UsersService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var UsersService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "BizServer.UsersService",
	HandlerType: (*UsersServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SignUpUser",
			Handler:    _UsersService_SignUpUser_Handler,
		},
		{
			MethodName: "LoginUser",
			Handler:    _UsersService_LoginUser_Handler,
		},
		{
			MethodName: "AddCredit",
			Handler:    _UsersService_AddCredit_Handler,
		},
		{
			MethodName: "UnavailableDates",
			Handler:    _UsersService_UnavailableDates_Handler,
		},
		{
			MethodName: "Reserve",
			Handler:    _UsersService_Reserve_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "Hotel.proto",
}
