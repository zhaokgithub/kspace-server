import { Document, Schema } from 'mongoose';
import mongoose from "../mongo";

// 定义 Bucket 文档接口
export interface IBucket extends Document {
  bucketName: string;      // 存储空间名称
  bucketId: string;        // 存储空间唯一标识
  userName: string;        // 所属用户名称
  userId: string;          // 所属用户ID
  createdAt: Date;         // 创建时间
  updatedAt: Date;         // 更新时间
  // 状态：active（活跃）、inactive（不活跃）、deleted（已删除）
  status: 'active' | 'inactive' | 'deleted'; // 状态
  // 权限：private（私有）、public（公开）、custom（自定义）
  permission: 'private' | 'public' | 'custom'; // 权限
}

// 定义 Schema
const BucketSchema: Schema = new Schema(
  {
    bucketName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bucketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    permission: {
      type: String,
      enum: ['private', 'public', 'custom'],
      default: 'private',
    },
    //所属地域：保留字段，多服务分布式会用到
    region: {
      type: String,
      default: 'us-east-1',
    },
  },
  {
    timestamps: true, // 自动管理 createdAt 和 updatedAt
  }
);

// 创建模型
const Bucket = mongoose.model<IBucket>('Bucket', BucketSchema);

export default Bucket;
